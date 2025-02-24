import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AddItemComponent } from "./add-item/add-item.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AddItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShoppingList';
}
