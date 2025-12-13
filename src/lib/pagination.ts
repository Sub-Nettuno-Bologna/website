export interface PaginationConfig {
    pageSize?: number;
}

export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalCount: number;
}

export const DEFAULT_PAGE_SIZE = 9;

export function getPageSize(config?: PaginationConfig): number {
    return config?.pageSize && config.pageSize > 0 ? config.pageSize : DEFAULT_PAGE_SIZE;
}

export function getTotalPages(totalCount: number, pageSize?: number): number {
    const size = getPageSize({ pageSize });
    return Math.max(1, Math.ceil((totalCount || 0) / size));
}

export function clampPage(page: unknown): number {
    const p = Number(page ?? 1);
    return Number.isFinite(p) && p > 0 ? Math.floor(p) : 1;
}

export function buildStaticPaths(totalCount: number, pageSize?: number) {
    const totalPages = getTotalPages(totalCount, pageSize);
    return Array.from({ length: totalPages }, (_, i) => ({ params: { page: String(i + 1) } }));
}


