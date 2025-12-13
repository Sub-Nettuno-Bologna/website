#!/usr/bin/env bash

set -euo pipefail

# Simple Sanity delete helper
# Defaults
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATASET="production"
API_VERSION="2021-03-25"
YES="--yes"
DRY_RUN=""

print_usage() {
  cat <<'USAGE'
Usage: ./delete.sh [options]

Options:
  -a, --all                        Delete all documents of given type(s)
  -t, --type <name[,name2,...]>    Sanity _type to delete (comma-separated allowed)
  -q, --query <groq>               Custom GROQ that returns array of _id
  -d, --dataset <name>             Target dataset (default: production)
      --api-version <date>         Sanity API version (default: 2021-03-25)
  -y, --yes                        Skip confirmation prompts
      --dry-run                    Print ids to delete, do not delete
  -h, --help                       Show this help

Examples:
  # Delete all documents of a type
  ./delete.sh --type team --yes

  # Multiple types
  ./delete.sh --type team,course --yes

  # Custom query
  ./delete.sh --query "*[_type == 'team']._id" --yes

  # Preview what would be deleted
  ./delete.sh --type team --dry-run
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

JOIN_IDS() {
  # Read _id per line on stdin, join to one line space-separated
  paste -sd ' ' -
}

ALL=false
TYPES=""
GROQ_QUERY=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -a|--all)
      ALL=true; shift ;;
    -t|--type)
      TYPES="${2:-}"; shift 2 ;;
    -q|--query)
      GROQ_QUERY="${2:-}"; shift 2 ;;
    -d|--dataset)
      DATASET="${2:-production}"; shift 2 ;;
    --api-version)
      API_VERSION="${2:-$API_VERSION}"; shift 2 ;;
    -y|--yes)
      YES="--yes"; shift ;;
    --dry-run)
      DRY_RUN="--dry-run"; shift ;;
    -h|--help)
      print_usage; exit 0 ;;
    *)
      echo "Unknown option: $1" >&2
      print_usage
      exit 1 ;;
  esac
done

# Validate input
if [[ -z "$GROQ_QUERY" ]]; then
  if [[ "$ALL" = false && -z "$TYPES" ]]; then
    echo "Please specify --type <name[,name2,...]> or --query <groq> (or --all with --type)." >&2
    print_usage
    exit 1
  fi
fi

# Build GROQ if not provided
if [[ -z "$GROQ_QUERY" ]]; then
  # If --all, delete all docs for the given type(s)
  IFS=',' read -r -a types_array <<<"$TYPES"
  cleaned_types=()
  for t in "${types_array[@]}"; do
    t_trimmed="${t// /}"
    if [[ -n "$t_trimmed" ]]; then
      cleaned_types+=("$t_trimmed")
    fi
  done
  if [[ ${#cleaned_types[@]} -eq 0 ]]; then
    echo "No valid --type provided." >&2
    exit 1
  fi
  if [[ ${#cleaned_types[@]} -eq 1 ]]; then
    GROQ_QUERY="*[_type == '${cleaned_types[0]}']._id"
  else
    # Join types as quoted list: 'a','b'
    quoted_list=$(printf "'%s'," "${cleaned_types[@]}")
    quoted_list="${quoted_list%,}"
    GROQ_QUERY="*[_type in [${quoted_list}]]._id"
  fi
fi

printf "\n==> Using dataset: %s, api: %s\n" "$DATASET" "$API_VERSION"
printf "==> GROQ: %s\n" "$GROQ_QUERY"

# Fetch IDs
IDS=$(sanity documents query "$GROQ_QUERY" --apiVersion "$API_VERSION" --dataset "$DATASET" | tr -d '[]",' | tr ' ' '\n' | sed '/^$/d')

if [[ -z "$IDS" ]]; then
  echo "No matching documents found."; exit 0
fi

COUNT=$(echo "$IDS" | wc -l | tr -d ' ')
printf "Found %s document(s) to delete.\n" "$COUNT"

if [[ -n "$DRY_RUN" ]]; then
  echo "--dry-run enabled. These IDs would be deleted:"
  echo "$IDS"
  exit 0
fi

# Delete
echo "$IDS" | JOIN_IDS | xargs -r sanity documents delete $YES --dataset "$DATASET"

echo "Deletion completed."