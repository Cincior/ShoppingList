import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Item } from '../../interface/Item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './item-update.component.html',
  styleUrl: './item-update.component.css'
})
export class ItemUpdateComponent {
  @Input() itemUpd: Item = {id: -1, itemName: '', itemQuantity: -1};
  @Output() updated = new EventEmitter<ItemUpdateComponent>();
  @ViewChild('itemNameInput') itemNameInput!: ElementRef;
  constructor() {

  }

  confirmUpdate() {
    this.updated.emit(this)
  }

  ngAfterViewInit() {
    this.itemNameInput.nativeElement.focus();
  }
}
