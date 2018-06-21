import { Subject } from 'rxjs';

import { ConeIceCream } from './cone-ice-cream.model';
import { StickIceCream } from './stick-ice-cream.model';

export class IceCreamService {

    constructor() {}

    coneIceCream: ConeIceCream[];

    stickIceCream: StickIceCream[];

    // iceCreamTypeSelected = new Subject<string>();

}