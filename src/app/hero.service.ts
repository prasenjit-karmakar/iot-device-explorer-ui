import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'http://34.209.187.83/api/v0/iothub/devices';  // URL to web api
  //private heroesUrl = 'http://localhost:9095/api/v0/iothub/devices';

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               //.then(response => response.json().data as Hero[])
               .then(this.extractData)
               .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  getHero(deviceId: string): Promise<Hero> {
    const url = `${this.heroesUrl}/${deviceId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  delete(deviceId: string): Promise<void> {
    const url = `${this.heroesUrl}/${deviceId}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(deviceId: string): Promise<Hero> {
  const url = `${this.heroesUrl}/${deviceId}`;
    return this.http
      .post(url, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Hero)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
