import { Injectable } from "@angular/core";
import { ITrack } from '../../core/models/track.model';


@Injectable()
export class PlayerService {

    public playing: boolean;
    public tracks: Array<ITrack>;

    constructor() {
        this.tracks = [];
    }

    public play(index: number) {
        this.playing = true;
    }

    public pause(index: number) {
        this.playing = false;
    }

    public addTrack(track: ITrack) {
        this.tracks.push(track);
    }

    public removeTrack(track: ITrack): void {
        let index = this.getTrack(track);
        if (index > -1) {
            this.tracks.splice(index, 1);
        }

    }

    public reorderTrack(track: ITrack, newIndex: number) {
        let index = this.getTrack(track);
        if (index > -1) {
            this.tracks.splice(newIndex, 0, this.tracks.splice(index, 1)[0]);
        }
    }

    public getTrack(track: ITrack): number {
        let index = -1;
        for (let i = 0; i < this.tracks.length; i++) {
            if (track.filepath === this.tracks[i].filepath) {
                index = i;
                break;
            }
        }
        return index;
    }





}