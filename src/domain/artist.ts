import { EntityBase } from "./entity-base";

export interface Artist extends EntityBase {
    name: string;
    surname: string;
    yearBorn?: number;
    yearDied?: number;
    country?: string;
}