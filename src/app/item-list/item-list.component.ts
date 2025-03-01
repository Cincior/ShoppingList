import { Component, inject } from '@angular/core';
import { ItemsService } from '../../items.service';
import { Item } from '../Item';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ItemComponent } from "../item/item.component";

@Component({
  selector: 'app-item-list',
  imports: [CommonModule, ItemComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  private itemsService = inject(ItemsService);
  private itemSubscription: Subscription;

  receivedData: Item[] = [];

  constructor() {
    this.itemSubscription = this.itemsService.data$.subscribe((item) => {
      this.receivedData.push(item);
    });
  }

  ngOnDestroy() {
    this.itemSubscription.unsubscribe();
  }
}
