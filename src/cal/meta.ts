export interface Resource {
    name: string;
    properties: ResourceProperty[];
    relations: ResourceRelation[];
}

export interface ResourceProperty {
    name: string;
    type: string;
    required: boolean;
}
export interface ResourceRelation {
    targetResource: string;
    role: string;
    inverseRole?: string;
    minCardinality: string;
    maxCardinality: string;
}

export interface Role {
    name: string;
    permissions: Permission[];
}

export interface Permission {
    resource: string;
    grant: string;
    allow?: boolean;
    deny?: boolean;
}

