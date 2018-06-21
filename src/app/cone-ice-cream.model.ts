import { Flavour } from './flavour.model';

export class ConeIceCream {

    constructor( public flavour: Flavour, 
                public scoopsAmount: number,
                public type: string
                ) {}

}