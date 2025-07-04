import { EventEmitter, Injectable } from "@angular/core";
import { Item } from "../interface/Item";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class ItemsService {
    private newItemSubject = new BehaviorSubject<Item | null>(null);

    newItem$ = this.newItemSubject.asObservable();

    notifyNewItem(item: Item) {
        this.newItemSubject.next(item);
    }
}