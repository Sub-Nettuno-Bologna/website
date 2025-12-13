#!/usr/bin/env bash

set -euo pipefail

# Simple Sanity import helper
# Defaults
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMPORT_DIR="$ROOT_DIR/import"
DATASET="production"
MODE="replace" # allowed: replace | missing
YES="--yes"
SKIP_HISTORY=""
ALLOW_FAILING_ASSETS=""
ASSET_CONCURRENCY=""

print_usage() {
  cat <<'USAGE'
Usage: ./import.sh [options]

Options:
  -a, --all                      Import all .ndjson files from ./import
  -f, --file <path|name>         Import a single file (basename or path)
  -d, --dataset <name>           Target dataset (default: production)
  -m, --mode <replace|missing>   Import mode (default: replace)
      --skip-history             Skip importing document history
      --allow-failing-assets     Continue even if some assets fail
      --asset-concurrency <n>    Number of concurrent asset uploads
  -y, --yes                      Skip confirmation prompts
  -h, --help                     Show this help

Examples:
  ./import.sh --all
  ./import.sh --file team
  ./import.sh --file import/hero.ndjson --dataset production --mode missing
USAGE
}

has_cmd() { command -v "$1" >/dev/null 2>&1; }

sanity() {
  if has_cmd pnpm; then
    pnpm exec sanity "$@"
  else
    npx -y sanity "$@"
  fi
}

resolve_file() {
  local input="$1"
  local resolved=""
  if [[ -z "$input" ]]; then
    echo ""; return 0
  fi
  if [[ -f "$input" ]]; then
    resolved="$input"
  else
    local base="$input"
    if [[ "$base" != *.ndjson ]]; then
      base="$base.ndjson"
    fi
    if [[ -f "$IMPORT_DIR/$base" ]]; then
      resolved="$IMPORT_DIR/$base"
    else
      echo ""; return 0
    fi
  fi
  echo "$resolved"
}

MODE_FLAG() {
  case "$MODE" in
    replace) echo "--replace" ;;
    missing) echo "--missing" ;;
    *) echo "" ;;
  esac
}

IMPORT_ONE() {
  local file="$1"
  printf "\n==> Importing: %s (dataset: %s, mode: %s)\n" "$file" "$DATASET" "$MODE"
  sanity dataset import "$file" "$DATASET" "$(MODE_FLAG)" $YES \
    $SKIP_HISTORY $ALLOW_FAILING_ASSETS $ASSET_CONCURRENCY
}

ALL=false
FILE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -a|--all)
      ALL=true; shift ;;
    -f|--file)
      FILE="${2:-}"; shift 2 ;;
    -d|--dataset)
      DATASET="${2:-production}"; shift 2 ;;
    -m|--mode)
      MODE="${2:-replace}"; shift 2 ;;
    --skip-history)
      SKIP_HISTORY="--skip-history"; shift ;;
    --allow-failing-assets)
      ALLOW_FAILING_ASSETS="--allow-failing-assets"; shift ;;
    --asset-concurrency)
      ASSET_CONCURRENCY="--asset-concurrency ${2:-}"; shift 2 ;;
    -y|--yes)
      YES="--yes"; shift ;;
    -h|--help)
      print_usage; exit 0 ;;
    *)
      echo "Unknown option: $1" >&2
      print_usage
      exit 1 ;;
  esac
done

if [[ "$ALL" = false && -z "$FILE" ]]; then
  echo "Please specify --all or --file <name|path>" >&2
  print_usage
  exit 1
fi

if [[ "$ALL" = true ]]; then
  if [[ ! -d "$IMPORT_DIR" ]]; then
    echo "Import directory not found: $IMPORT_DIR" >&2
    exit 1
  fi

  # Collect files
  files=("$IMPORT_DIR"/*.ndjson)
  if [[ ! -e "${files[0]}" ]]; then
    echo "No .ndjson files found in $IMPORT_DIR" >&2
    exit 1
  fi

  # Priority order to satisfy references (courses -> course-category)
  priority=("courses.ndjson" "course-category.ndjson")

  # Import priority files first if present
  for name in "${priority[@]}"; do
    f="$IMPORT_DIR/$name"
    if [[ -e "$f" ]]; then
      IMPORT_ONE "$f"
    fi
  done

  # Import remaining files (excluding already imported ones)
  for f in "${files[@]}"; do
    base="$(basename "$f")"
    skip=false
    for name in "${priority[@]}"; do
      if [[ "$base" == "$name" ]]; then
        skip=true; break
      fi
    done
    if [[ "$skip" == false ]]; then
      IMPORT_ONE "$f"
    fi
  done

  printf "\nAll imports completed.\n"
  exit 0
fi

if [[ -n "$FILE" ]]; then
  TARGET="$(resolve_file "$FILE")"
  if [[ -z "$TARGET" ]]; then
    echo "File not found: $FILE (searched in current path and $IMPORT_DIR)" >&2
    exit 1
  fi
  IMPORT_ONE "$TARGET"
  printf "\nImport completed.\n"
fi


