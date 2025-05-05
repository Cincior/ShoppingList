import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Item } from '../Item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerService } from '../server.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item: Item = {id: -1, itemName: 't', itemQuantity: -1};
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() itemUpdated = new EventEmitter<Item>();
  @ViewChild('itemNameInput') itemNameInput!: ElementRef;
  @ViewChild('itemQuantityInput') itemQuantityInput!: ElementRef;

  static itemIndex = 0;
  static focusedComponents = new Map<number, ItemComponent>();

  isEditing = false;
  shouldFocus = false;
  private index = 0;

  itemNameValue: string = '';
  itemQuantityValue: number = 0;

  constructor(private http: HttpClient, private serverService: ServerService) {};

  ngOnInit() {
    this.index = ItemComponent.itemIndex;
    ItemComponent.itemIndex++;
  }

  deleteItem() {
    console.log("del")
    console.log(this.item.id)
      this.serverService.deleteItem(this.item).subscribe({
      next: (res) => {
        console.log("Usunięto pomyślnie", res);
        this.itemDeleted.emit(this.item.id);
      },
      error: (err) => {
        console.error("Błąd podczas usuwania:", err);
      }
    });
  }

  updateItem() {
    this.isEditing = true;
    this.shouldFocus = true;

    this.itemNameValue = this.item.itemName;
    this.itemQuantityValue = this.item.itemQuantity;  

    console.log("upd: " + this.index);
    ItemComponent.focusedComponents.set(this.index, this);
  }

  confirmUpdate() {
    const updatedItem: Item = {
      id: this.item.id,
      itemName: this.itemNameValue,
      itemQuantity: Number(this.itemQuantityValue)
    };

    this.serverService.updateItem(updatedItem).subscribe({
      next: res => {
        this.itemUpdated.emit(updatedItem);
      },
      error: err => {
        console.log(err)
      }
    })
    this.isEditing = false;
    ItemComponent.focusedComponents.delete(this.index);
    if(ItemComponent.focusedComponents.size > 0) {
      const lastKey = Array.from(ItemComponent.focusedComponents.keys())[ItemComponent.focusedComponents.size - 1];
      const last = ItemComponent.focusedComponents.get(lastKey);
      if (last) {
        last.shouldFocus = true;
      }
    }
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked" + this.isEditing + " " + this.shouldFocus)
    if(this.isEditing && this.shouldFocus) {
      const lastKey = Array.from(ItemComponent.focusedComponents.keys())[ItemComponent.focusedComponents.size - 1];
      const last = ItemComponent.focusedComponents.get(lastKey);
      last?.itemNameInput.nativeElement.focus();
      this.shouldFocus = false;
    }
    
  }


}
