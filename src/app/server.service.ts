import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './Item';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private apiUrl = 'http://localhost:777/api/posts';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  addItem(item: Item) {
    return this.http.post(this.apiUrl, item, {headers: this.headers});
  }

  deleteItem(item: Item) {
    return this.http.delete(this.apiUrl + "?id=" + item.id, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateItem(item: Item) {
    return this.http.put(this.apiUrl, item, {headers: this.headers});
  }
}
