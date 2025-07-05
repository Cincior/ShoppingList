import { Component, inject } from '@angular/core';
import { Item } from '../../interface/Item';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, last, Subscription } from 'rxjs';
import { ItemComponent } from "../item/item.component";
import { ServerService } from '../../services/server.service';
import { ItemsService } from '../../services/items.service';

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

  //handling focus order
  focusedComponents = new Map<number, ItemComponent>;

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

  deleteAllItems() {
    this.serverService.deleteAllItems().subscribe({
      next: () => {
        this.focusedComponents.clear();
        this.receivedData = [];
      }, 
      error: () => {
        alert("Failed to delete all items")
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

  handleItemFocuse($event: ItemComponent) {
    console.log("par: " + $event.isEditing)
    if(!$event.isEditing) {
      this.focusedComponents.delete($event.item.id);
      const lastKey = Array.from(this.focusedComponents.keys())[this.focusedComponents.size - 1];
    } else {
      this.focusedComponents.set($event.item.id, $event);
    }
  }

  ngOnDestroy(): void {
    if (this.newItemsSubscription) {
      this.newItemsSubscription.unsubscribe();  // Clear subscription
    }
  }

  ngAfterViewChecked() {
    // Enabel focus on recently clicked item
    const lastKey = Array.from(this.focusedComponents.keys())[this.focusedComponents.size - 1];
    if(lastKey != null) {
      console.log('lastkey: ' + lastKey);
      this.focusedComponents.get(lastKey)?.itemNameInput.nativeElement.focus();
    }
  }
  

}
