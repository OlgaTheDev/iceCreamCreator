import { Subject } from 'rxjs';

import { ConeIceCream } from '../cone-ice-cream.model';
import { StickIceCream } from '../stick-ice-cream.model';


export class ShoppingListService {

    shoppingList: (ConeIceCream|StickIceCream)[] = [];

    shoppingListUpdated = new Subject<(ConeIceCream|StickIceCream)[]>();

    addToShoppingList(item: ConeIceCream | StickIceCream) {
        this.shoppingList.push(item);
        this.shoppingListUpdated.next(this.shoppingList);
    }

}