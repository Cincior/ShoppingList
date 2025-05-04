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
  @ViewChild('itemNameInput') itemNameInput!: ElementRef;
  @ViewChild('itemQuantityInput') itemQuantityInput!: ElementRef;

  isEditing = false;

  constructor(private http: HttpClient, private serverService: ServerService) {};

  deleteItem() {
    console.log("del")
    console.log(this.item.id)
      this.serverService.deleteItem(this.item).subscribe({
      next: (res) => {
        console.log("Usunięto pomyślnie", res);
        // np. możesz dodać EventEmitter żeby poinformować rodzica o zmianie
        this.itemDeleted.emit(this.item.id);
      },
      error: (err) => {
        console.error("Błąd podczas usuwania:", err);
      }
    });
  }

  updateItem() {
    this.isEditing = true;
    //this.serverService.updateItem();
  }

  confirmUpdate() {
    const updatedItem: Item = {
      id: this.item.id,
      itemName: this.itemNameInput.nativeElement.value,
      itemQuantity: Number(this.itemQuantityInput.nativeElement.value)
    };

    this.serverService.updateItem(updatedItem).subscribe({
      next: res => {
        this.item = res as Item;
      },
      error: err => {
        console.log(err)
      }
    })
    this.isEditing = false;
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) {
      this.itemNameInput.nativeElement.focus();
    }
  }


}
