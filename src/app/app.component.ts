import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AddItemComponent } from "./add-item/add-item.component";
import { ItemListComponent } from "./item-list/item-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AddItemComponent, ItemListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShoppingList';
}
