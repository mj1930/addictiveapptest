import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';

@Injectable()
export class RegisterService {

  constructor(private _router: Router, private http: Http) { }
  public BASE_URL: string = environment.config.BASE_URL;

  register(userData) {
    return this.http.post(`${this.BASE_URL}user/signup`, {userData}).
      toPromise().then((res: Response) => res.json());
  }

}
