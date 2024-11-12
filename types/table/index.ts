export type header_align = ("start" | "end" | "center") | undefined;

export interface header {
    title?: string,
    key?: string,
    sortable?: boolean,
    width?: string,
    align?: header_align,
}


export type TableProps = {
    headers: header[],
}