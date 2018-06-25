import { Subject } from 'rxjs';


export class IceCreamService {

    constructor() {}

    iceCreamTypeChosen = new Subject<string>();


}