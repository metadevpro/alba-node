import { EntityBase } from "./entity-base";

export interface Song extends EntityBase {
    name: string;
    durationSecs: number;
}
