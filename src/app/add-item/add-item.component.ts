import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ItemsService } from '../../items.service';
import { Item } from '../Item';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  submitted: boolean;
  private itemService = inject(ItemsService);
  fetchedProduct: Item[] = [];

  addItemForm = new FormGroup({
    itemName: new FormControl('', Validators.required),
    itemQuantity: new FormControl(0, [Validators.required, Validators.min(1)]),
  });
  constructor(private serverService: ServerService) {
    this.submitted = false;

  }

  fetchProducts() {
    this.serverService.getProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.fetchedProduct = response.map(el => ({
          itemName: el.name,
          itemQuantity: el.quantity
        }) as Item)
      },
      error: (error) => {
        console.error('Błąd:', error);
      },
      complete: () => {}
    });
  }

  addItem() {
    this.submitted = true;
    if(this.addItemForm.get('itemName')?.errors || this.addItemForm.get('itemQuantity')?.errors) {
      return;
    }
    console.log(this.addItemForm.value.itemName + " " + this.addItemForm.value.itemQuantity);

    //send data
    let item: Item = {
      itemName: this.addItemForm.value.itemName ?? '',
      itemQuantity: this.addItemForm.value.itemQuantity ?? -1 
      }
    this.itemService.addItem(item);

    this.addItemForm.reset({
      itemName: '',
      itemQuantity: 0,
    });
    this.submitted = false
  }
}
