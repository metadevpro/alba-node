export interface HasHalLinks {
    _links: HalLinkObject;
}

export interface HalLinkObject {
    [ key: string ]: HalLink;
}

export interface HalLink {
    href: string;
    template?: string;
    verb?: string;
}