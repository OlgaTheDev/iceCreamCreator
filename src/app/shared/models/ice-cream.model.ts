import { Flavour } from './flavour.model';

export class IceCream {

    constructor( public type: string,
                public flavour: string, 
                public scoopsAmount: number,
                public shape: string,
                public price: number,
                public quantity: number) {}

}