import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewsResponse} from "../../models/response/news-response";
import {CategoryResponse} from "../../models/response/category-response";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  api: string = 'http://127.0.0.1:8000/api/categories';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.api);
  }

  public filter(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/filter?id=${id}`);
  }
}
