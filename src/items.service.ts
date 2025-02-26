import { EventEmitter, Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
})
export class ItemsService {
    dataChanged = new EventEmitter<{itemName: string; itemQuantity: number}>();

    addItem(itemName: string, itemQuantity: number) {
        this.dataChanged.emit({itemName, itemQuantity});
    }
}