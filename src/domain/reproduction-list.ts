import { Song } from "./song";
import { EntityBase } from "./entity-base";

export interface ReproductionList extends EntityBase {
    name: string;
    tracks: Song[];
}
