import { Component, OnInit } from '@angular/core';

import { ConeIceCream } from '../cone-ice-cream.model';
import { StickIceCream } from '../stick-ice-cream.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  constructor(private slService: ShoppingListService) { }

  shoppingList: (ConeIceCream|StickIceCream)[];

  ngOnInit() {
    this.shoppingList = this.slService.shoppingList;

    this.slService.shoppingListUpdated
      .subscribe(
        (updatedShoppingList: (ConeIceCream|StickIceCream)[]) => {
          this.shoppingList = updatedShoppingList;
        }
      )
  }

}
