import { Component, inject, OnInit } from '@angular/core';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  private itemsService = inject(ItemsService);

  receivedData: {itemName: string; itemQuantity: number} | null = null;

  ngOnInit() {
    this.itemsService.dataChanged.subscribe(data => {
      this.receivedData = data;
    });
  }
}
