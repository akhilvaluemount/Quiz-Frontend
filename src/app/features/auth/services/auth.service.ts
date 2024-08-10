import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  private baseUrl = environment.baseUrl + '/auth/'; // Replace with your API endpoint

  constructor(private _http: HttpClient) {}

  login(user:any): Observable<any> {
    return this._http.post<any>(this.baseUrl+'login', user);
  }

  
  register(user:any): Observable<any> {
    return this._http.post<any>(this.baseUrl+'register', user);
  }

}
