import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Item } from '../../interface/Item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerService } from '../../services/server.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemUpdateComponent } from '../item-update/item-update.component';

@Component({
  selector: 'app-item',
  imports: [CommonModule, FormsModule, ItemUpdateComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item: Item = {id: -1, itemName: 't', itemQuantity: -1};
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() itemUpdated = new EventEmitter<Item>();
  @Output() itemFocuse = new EventEmitter<ItemComponent>(); //for handling update focuses 
  @ViewChild('iUpdate') iUpdate!: ItemUpdateComponent;
  //@ViewChild('itemNameInput',) itemNameInput!: ElementRef;
  //@ViewChild('itemQuantityInput') itemQuantityInput!: ElementRef;

  isEditing = false;

  // itemNameValue: string = '';
  // itemQuantityValue: number = 0;

  constructor(private serverService: ServerService) {};

  ngOnInit() {
    
  }

  deleteItem() {
    console.log("del")
    console.log(this.item.id)
      this.serverService.deleteItem(this.item).subscribe({
      next: (res) => {
        console.log("Usunięto pomyślnie", res);
        this.itemDeleted.emit(this.item.id);
        this.isEditing = false;
        this.itemFocuse.emit(this);
      },
      error: (err) => {
        console.error("Błąd podczas usuwania:", err);
      }
    });
  }

  updateItem() {
    this.isEditing = true;
    this.itemFocuse.emit(this);
    console.log("isedit:" + this.isEditing);

    // this.itemNameValue = this.item.itemName;
    // this.itemQuantityValue = this.item.itemQuantity; 
  }

  updated(updatedItem: ItemUpdateComponent) {
    this.confirmUpdate();
  }

  confirmUpdate() {
    console.log(this.item.itemQuantity)
    const updatedItem: Item = {
      id: this.item.id,
      itemName: this.item.itemName,
      itemQuantity: this.item.itemQuantity
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
    this.itemFocuse.emit(this);
  }

  ngAfterViewChecked() {
  
  }

}
