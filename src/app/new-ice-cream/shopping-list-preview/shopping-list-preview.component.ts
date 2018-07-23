import { Component, OnInit, OnDestroy } from '@angular/core';

import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { IceCream } from '../../shared/models/ice-cream.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list-preview',
  templateUrl: './shopping-list-preview.component.html',
  styleUrls: ['./shopping-list-preview.component.scss']
})

export class ShoppingListPreviewComponent implements OnInit, OnDestroy {

  constructor(private slService: ShoppingListService) { }

  shoppingList: (IceCream)[];
  subs: Subscription;
  
  ngOnInit() {

    this.shoppingList = this.slService.shoppingList;

    this.subs = this.slService.shoppingListUpdated
      .subscribe(
        (updatedSL: (IceCream)[]) => {
          this.shoppingList = updatedSL;
        }
      )

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
