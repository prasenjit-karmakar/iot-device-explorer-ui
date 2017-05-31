import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Device }           from './device';

@Injectable()
export class DeviceSearchService {

//private apiUrl = 'http://34.209.187.83/api/v0/iothub/devices/search';  // URL to web api
private apiUrl = 'http://localhost:9095/api/v0/iothub/devices/search';

  constructor(private http: Http) {}

  search(term: string): Observable<Device[]> {
    return this.http
               .get(`${this.apiUrl}?name=${term}`)
               .map(response => response.json() as Device[]);
  }
}
