import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  submitted: boolean;
  private itemService = inject(ItemsService)

  addItemForm = new FormGroup({
    itemName: new FormControl('', Validators.required),
    itemQuantity: new FormControl(0, [Validators.required, Validators.min(1)]),
  });
  constructor() {
    this.submitted = false;
  }

  addItem() {
    this.submitted = true;
    if(this.addItemForm.get('itemName')?.errors || this.addItemForm.get('itemQuantity')?.errors) {
      return;
    }
    console.log(this.addItemForm.value.itemName + " " + this.addItemForm.value.itemQuantity);

    //send data
    this.itemService.addItem(this.addItemForm.value.itemName ?? '', this.addItemForm.value.itemQuantity ?? -1);

    this.addItemForm.reset({
      itemName: '',
      itemQuantity: 0,
    });
    this.submitted = false
  }
}
