import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthRequest} from "../../models/request/auth-request";
import {RegisterRequest} from "../../models/request/register-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  api: string = "http://127.0.0.1:8000/api/auth";

  public login(authRequest: AuthRequest): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, authRequest);
  }

  public register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.api}/register`, registerRequest);
  }

  public logout(): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/logout', null);
  }
}
