export type header_align = ("start" | "end" | "center") | undefined;

export interface header {
    title?: string,
    key?: string,
    sortable?: boolean,
    width?: string,
    align?: header_align,
}

export type PaginationOption = number | {
    title: string,
    value: number,
}

export type TableProps = {
    headers: header[],
    pagination_options?: PaginationOption[]
}

