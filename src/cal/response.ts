import { HasHalLinks, HalLinkObject } from "./hal";

export interface Response<T> extends HasHalLinks {
    meta: MetaObject;
    data: T[];
    _links: HalLinkObject;
}

export interface MetaObject {
    totalCount?: number;
    offset?: number;
    limit?: number;
}
