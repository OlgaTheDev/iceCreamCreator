import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { IceCream } from '../ice-cream.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  constructor(private slService: ShoppingListService) { }

  shoppingList: IceCream[];

  ngOnInit() {
    this.shoppingList = this.slService.shoppingList;

    this.slService.shoppingListUpdated
      .subscribe(
        (updatedShoppingList: IceCream[]) => {
          this.shoppingList = updatedShoppingList;
          console.log(updatedShoppingList)
        }
      )
  }

}
