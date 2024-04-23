import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewsRequest} from "../../models/request/news-request";
import {NewsResponse} from "../../models/response/news-response";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {}

  api: string = "http://127.0.0.1:8000/api/news";

  public save(newsRequest: NewsRequest): Observable<NewsResponse> {
    return this.http.post<NewsResponse>(this.api, newsRequest);
  }

  public update(newsRequest: NewsRequest, id: number): Observable<NewsResponse> {
    return this.http.put<NewsResponse>(`${this.api}/${id}`, newsRequest);
  }

  public getOne(id: number): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.api}/${id}`);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }

  public getAll(page: number): Observable<any> {
    return this.http.get<any>(`${this.api}/?page=${page}`);
  }

  public search(search: string): Observable<NewsResponse[]> {
    return this.http.get<NewsResponse[]>(`http://127.0.0.1:8000/api/search?search=${search}`);
  }

}
