import { Subject } from 'rxjs';
import { IceCream } from '../shared/models/ice-cream.model';
import { Injectable } from '@angular/core';


export class ShoppingListService {

    shoppingList: IceCream[] = [];

    shoppingListUpdated = new Subject<IceCream[]>();

    addToShoppingList(item: IceCream) {
        this.shoppingList.push(item);
        this.shoppingListUpdated.next(this.shoppingList);
    }

    deleteFromShoppingList(id: number) {
        this.shoppingList.splice(id, 1);
        this.shoppingListUpdated.next(this.shoppingList);
    }

    clearShoppingList() {
        this.shoppingList = [];        
        this.shoppingListUpdated.next(this.shoppingList);
    }

}