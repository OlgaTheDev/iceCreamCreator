import { Subject } from "rxjs";

export class CheckoutService {

    orderPlaced = new Subject<boolean>();
}