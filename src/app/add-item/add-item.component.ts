import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-add-item',
  imports: [ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

  addItemForm = new FormGroup({
    itemName: new FormControl(''),
    quantity: new FormControl(0),
  });

  addItem() {
    console.log("added!");
  }
}
