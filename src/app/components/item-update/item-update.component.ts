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

  ngOnInit() {
    
  }

  confirmUpdate() {
    this.updated.emit(this)
  }

  amountOfDigits(number: number) {
    let amount = 1;
    while(number > 9) {
      number = Math.floor(number / 10);
      amount++;
    }
    return amount
  }

  resizeTextArea(textarea: HTMLTextAreaElement) {
    textarea.style.height = '0px';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  ngAfterViewInit() {
    this.itemNameInput.nativeElement.focus();
  }

   ngAfterViewChecked() {
    this.resizeTextArea(this.itemNameInput.nativeElement)
  }
}
