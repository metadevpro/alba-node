export interface Error {
    code: string;
    description?: string;
    template?: string;
    args?: Argument[];
    context?: any;
}

export interface Argument {
    [field: string]: string;
}
