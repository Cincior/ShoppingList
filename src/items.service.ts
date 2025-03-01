import { EventEmitter, Injectable } from "@angular/core";
import { Item } from "./app/Item";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ItemsService {
    private dataSubject = new Subject<Item>
    data$ = this.dataSubject.asObservable();

    addItem(item: Item) {
        this.dataSubject.next(item);
    }
}