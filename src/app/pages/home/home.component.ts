import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AddItemComponent } from '../../components/add-item/add-item.component';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, AddItemComponent, ItemListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
