import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ConeIceCream } from '../../cone-ice-cream.model';
import { StickIceCream } from '../../stick-ice-cream.model';

@Component({
  selector: 'app-shopping-list-preview',
  templateUrl: './shopping-list-preview.component.html',
  styleUrls: ['./shopping-list-preview.component.scss']
})

export class ShoppingListPreviewComponent implements OnInit {

  constructor(private slService: ShoppingListService) { }

  shoppingList: (ConeIceCream|StickIceCream)[];

  
  ngOnInit() {

    this.shoppingList = this.slService.shoppingList;

    this.slService.shoppingListUpdated
      .subscribe(
        (updatedSL: (ConeIceCream|StickIceCream)[]) => {
          this.shoppingList = updatedSL;
        }
      )

  }

}
