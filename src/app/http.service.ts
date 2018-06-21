import { Flavour } from "./flavour.model";

export class HttpService {

    flavours: Flavour[] = [
        {name: 'strawberry', imgPath: '../../assets/images/strawberry.svg'},
        {name: 'raspberry', imgPath: '../../assets/images/raspberry.svg'},
        {name: 'chocolate', imgPath: '../../assets/images/chocolate.svg'},
        {name: 'lemon', imgPath: '../../assets/images/lemon.svg'},
        {name: 'pineapple', imgPath: '../../assets/images/pineapple.svg'}
    ];

    scoops: number[] = [1, 2, 3];

    getFlavours() {
        return this.flavours;
    }

    getScoops() {
        return this.scoops;
    }
}