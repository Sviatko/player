import {Injectable} from '@angular/core';
import {Media, MediaService} from "./media-service.service";
import {map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class OnsignageMediaServiceService implements MediaService {

  private API_PATH_PLAYLIST: string = 'https://test.onsignage.com/PlayerBackend/screen/playlistItems/';
  private API_PATH_SOURCE: string = 'https://test.onsignage.com/PlayerBackend/creative/get/';
  private defaultDuration = 10; //sec
  private resp = {
    "screenKey": "0f127773-529f-4ff8-b211-af9e5c22a5bc",
    "breakpointInterval": 0,
    "playlists": [
      {
        "channelTime": 0,
        "playlistItems": [
          {
            "creativeRefKey": null,
            "duration": 10,
            "dataSize": 586760,
            "expireDate": "9999-12-30 00:00:00",
            "startDate": "0000-00-00 00:00:00",
            "modified": null,
            "contentModified": null,
            "startReccurenceTime": null,
            "expireReccurenceTime": null,
            "selectedReccurenceDays": null,
            "collectStatistics": false,
            "creativeProperties": null,
            "creativeLabel": "pixabayImage-1518843.jpg",
            "ignoreEventsWhilePlaying": false,
            "playOnlyOnEvent": false,
            "slidePriority": 0,
            "playlistKey": "22abeab2-9905-452c-b9a6-73d444209a7e",
            "creativeKey": "b1f1b49b-46b8-49ef-8177-309d28128bf7.jpg",
            "orderKey": 0,
            "eventTypesList": []
          },
          {
            "creativeRefKey": null,
            "duration": 19,
            "dataSize": 7848203,
            "expireDate": "9999-12-30 00:00:00",
            "startDate": "0000-00-00 00:00:00",
            "modified": null,
            "contentModified": null,
            "startReccurenceTime": null,
            "expireReccurenceTime": null,
            "selectedReccurenceDays": null,
            "collectStatistics": false,
            "creativeProperties": null,
            "creativeLabel": "WhatsApp Video 2020-04-20 at 7.44....mp4",
            "ignoreEventsWhilePlaying": false,
            "playOnlyOnEvent": false,
            "slidePriority": 0,
            "playlistKey": "22abeab2-9905-452c-b9a6-73d444209a7e",
            "creativeKey": "fbc403c5-e00f-4b35-9c8d-3c83217d3cbd.mp4",
            "orderKey": 1,
            "eventTypesList": []
          },
          {
            "creativeRefKey": null,
            "duration": 10,
            "dataSize": 443634,
            "expireDate": "9999-12-30 00:00:00",
            "startDate": "0000-00-00 00:00:00",
            "modified": null,
            "contentModified": null,
            "startReccurenceTime": null,
            "expireReccurenceTime": null,
            "selectedReccurenceDays": null,
            "collectStatistics": false,
            "creativeProperties": null,
            "creativeLabel": "pixabayImage-5098479.jpg",
            "ignoreEventsWhilePlaying": false,
            "playOnlyOnEvent": false,
            "slidePriority": 0,
            "playlistKey": "22abeab2-9905-452c-b9a6-73d444209a7e",
            "creativeKey": "df1b9a4b-f5ea-41f0-b778-3aaa1fc19906.jpg",
            "orderKey": 2,
            "eventTypesList": []
          },
          {
            "creativeRefKey": null,
            "duration": 30,
            "dataSize": 6752046,
            "expireDate": "9999-12-30 00:00:00",
            "startDate": "0000-00-00 00:00:00",
            "modified": null,
            "contentModified": null,
            "startReccurenceTime": null,
            "expireReccurenceTime": null,
            "selectedReccurenceDays": null,
            "collectStatistics": false,
            "creativeProperties": null,
            "creativeLabel": "pixabayVideo-small-56493.mp4",
            "ignoreEventsWhilePlaying": false,
            "playOnlyOnEvent": false,
            "slidePriority": 0,
            "playlistKey": "22abeab2-9905-452c-b9a6-73d444209a7e",
            "creativeKey": "86619515-6aef-4d0e-b2ec-da192c28d38d.mp4",
            "orderKey": 3,
            "eventTypesList": []
          }
        ],
        "playlistKey": "22abeab2-9905-452c-b9a6-73d444209a7e"
      }
    ],
    "modified": 1644317279091
  };

  constructor(private httpClient: HttpClient) { }

  getPlaylist(screenId: string): Observable<Media[]> {
    const path = this.API_PATH_PLAYLIST + screenId;
    const readyList:Media[] = [];
    return this.httpClient.get<any>(path).pipe(map(resp => {
      if (resp) {
        const lists = resp['playlists'];
        if (lists && lists.length) {
          for (const list of lists) {
            const playlistItems = list.playlistItems ? list.playlistItems : [];
            for (const item of playlistItems) {
              readyList.push(
                {
                  path: this.API_PATH_SOURCE + item.creativeKey,
                  name: item.creativeLabel,
                  type: item.creativeKey.substring(item.creativeKey.lastIndexOf('.')),
                  duration: item.duration || this.defaultDuration
                })
            }
          }
        }
      }
      return readyList
    }))

  }
}
