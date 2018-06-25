import { Flavour } from "./flavour.model";
import { IceCreamType } from "./type.model";

export class HttpService {

    flavours: Flavour[] = [
        {name: 'strawberry', imgPath: '../../assets/images/strawberry.svg'},
        {name: 'raspberry', imgPath: '../../assets/images/raspberry.svg'},
        {name: 'chocolate', imgPath: '../../assets/images/chocolate.svg'},
        {name: 'lemon', imgPath: '../../assets/images/lemon.svg'},
        {name: 'pineapple', imgPath: '../../assets/images/pineapple.svg'}
    ];

    scoops: number[] = [1, 2, 3];

    types: IceCreamType[] = [
        {name: 'cone', imgPath: '../../assets/images/cone.svg'},
        {name: 'stick', imgPath: '../../assets/images/stick.svg'}
    ];

    getFlavours() {
        return this.flavours;
    }

    getScoops() {
        return this.scoops;
    }

    getTypes() {
        return this.types;
    }
}