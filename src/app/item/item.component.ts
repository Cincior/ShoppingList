import { Component, Input } from '@angular/core';
import { Item } from '../Item';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item: Item = {itemName: '', itemQuantity: -1};

}
