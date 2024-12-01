export type header_align = ("start" | "end" | "center") | undefined;

export enum TablePage {
    ModelBrand = 'ModelBrand',
    ModelNews = 'ModelNews',
    ModelUser = 'ModelUser',
}

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
    pagination_options?: PaginationOption[],
    has_delete?: boolean,
    show_link?: boolean,
    page?: TablePage
}

