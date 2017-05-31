import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Device } from './device';

@Injectable()
export class DeviceService {

  private headers = new Headers({'Content-Type': 'application/json'});
  //private apiUrl = 'http://34.209.187.83/api/v0/iothub/devices';  // URL to web api
  private apiUrl = 'http://localhost:9095/api/v0/iothub/devices';

  constructor(private http: Http) { }

  getDevices(): Promise<Device[]> {
    return this.http.get(this.apiUrl)
               .toPromise()
               .then(response => response.json() as Device[])
               //.then(this.extractData)
               .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  getDevice(deviceId: string): Promise<Device> {
    const url = `${this.apiUrl}/${deviceId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Device)
      .catch(this.handleError);
  }

  delete(deviceId: string): Promise<void> {
    const url = `${this.apiUrl}/${deviceId}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(deviceId: string): Promise<Device> {
  const url = `${this.apiUrl}/${deviceId}`;
    return this.http
      .post(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Device)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
