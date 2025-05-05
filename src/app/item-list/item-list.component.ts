import { Component, inject } from '@angular/core';
import { Item } from '../Item';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ItemComponent } from "../item/item.component";
import { ServerService } from '../server.service';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-list',
  imports: [CommonModule, ItemComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  isLoading: number = 0; // 0 -loading 1 - loaded, -1 - error
  receivedData: Item[] = [];
  newItemsSubscription!: Subscription;

  constructor(private serverService: ServerService, private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.loadItems();
    this.newItemsSubscription = this.itemsService.newItem$.subscribe((newItem) => {
      if(newItem) {
        this.receivedData.push(newItem);
      }
    })
  }

  loadItems() {
    this.isLoading = 0;
    this.serverService.getProducts().subscribe({
      next: res => {
        this.receivedData = res;
        this.isLoading = 1;
      },
      error: err => {
        this.isLoading = -1;
      }
  })
  }
  handleItemDeleted(deletedId: number) {
    this.receivedData = this.receivedData.filter(item => item.id != deletedId);
  }

  handleItemUpdated(item: Item) {
    const index = this.receivedData.findIndex(i => i.id === item.id);
    if(index !== -1) {
      this.receivedData[index] = item;
    }
  }

  ngOnDestroy(): void {
    if (this.newItemsSubscription) {
      this.newItemsSubscription.unsubscribe();  // Czyszczenie subskrypcji
    }
  }

}
