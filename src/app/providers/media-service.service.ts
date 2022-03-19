import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

/*export interface Media {
  screenKey: string, // "0f127773-529f-4ff8-b211-af9e5c22a5bc",
  breakpointInterval: string, // 0,
  playlists: Playlist[]
}

export interface Playlist {
  channelTime: 0,
  playlistItems: [
    fileKey: "pixabayImage-1518843.jpg",
    creativeKey: "b1f1b49b-46b8-49ef-8177-309d28128bf7.jpg",
  ]
}*/

export interface Media {
  name: string;
  path: string;
  type: string;
  duration: number;
}

@Injectable()
export abstract class MediaService {
  abstract getPlaylist(screenId: string): Observable<Media[]>;
}
