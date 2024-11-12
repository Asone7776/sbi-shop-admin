import type {TableProps} from "~/types/table";
import type {Models} from "~/types/models";


export type meta = {
    total: number
    lastPage: number
    page: number
    perPage: number
    prev: number | null
    next: number | null
}

export interface PaginatedResult<T> {
    data: T[]
    meta: meta
}


export type ListProps = {
    model: Models,
    table: TableProps,
    has_search?: boolean,
    has_add?: boolean,
    params?: Record<string, any>,
}