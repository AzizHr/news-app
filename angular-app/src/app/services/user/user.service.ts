import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserResponse} from "../../models/response/user-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api: string = "http://127.0.0.1:8000/api/user";

  constructor(private http: HttpClient) {}

  public user(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.api);
  }
}
