export interface Criteria {
    count?: boolean;
    order?: string;
    offset?: number;
    limit?: number;
    groupBy?: string;
    where?: Clause[];
    distict?: boolean;
    projection?: string;
}

export interface Clause {
    op: string;
    [field: string]: boolean | string | number | Clause;
}
