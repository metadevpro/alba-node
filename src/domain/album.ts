import { Artist } from "./artist";
import { EntityBase } from "./entity-base";
import { Song } from "./song";

export interface Album extends EntityBase {
    title: string;
    author: Artist;
    tracks: Song[];
    genre: string;
}
