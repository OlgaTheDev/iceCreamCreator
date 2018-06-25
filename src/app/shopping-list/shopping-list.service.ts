import { Subject } from 'rxjs';

import { IceCream } from '../ice-cream.model';


export class ShoppingListService {

    shoppingList: IceCream[] = [];

    shoppingListUpdated = new Subject<IceCream[]>();

    addToShoppingList(item: IceCream) {
        this.shoppingList.push(item);
        this.shoppingListUpdated.next(this.shoppingList);
    }

}