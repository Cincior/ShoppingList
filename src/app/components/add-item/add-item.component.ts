import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { Item } from '../../interface/Item';
import { ServerService } from '../../services/server.service';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  @Output() itemAdded = new EventEmitter<Item>();

  submitted: boolean;
  fetchedProduct: Item[] = [];

  addItemForm = new FormGroup({
    itemName: new FormControl('', Validators.required),
    itemQuantity: new FormControl(0, [Validators.required, Validators.min(1)]),
  });
  constructor(private serverService: ServerService, private itemsService: ItemsService) {
    this.submitted = false;

  }

  addItem(event: Event) {
    this.submitted = true;
    if(this.addItemForm.get('itemName')?.errors || this.addItemForm.get('itemQuantity')?.errors) {
      return;
    }
    console.log(this.addItemForm.value.itemName + " " + this.addItemForm.value.itemQuantity);

    //send data
    let item: Item = {
      id: -1,
      itemName: this.addItemForm.value.itemName ?? '',
      itemQuantity: this.addItemForm.value.itemQuantity ?? -1 
      }
    this.serverService.addItem(item).subscribe({
      next: res => {
        console.log('Dodano:', res);
        item.id = res.id;
        this.itemsService.notifyNewItem(item);
      },
      error: err => {
        console.error('Błąd:', err);
      }
    });

    this.addItemForm.reset({
      itemName: '',
      itemQuantity: 0,
    });
    this.submitted = false
  }
}
