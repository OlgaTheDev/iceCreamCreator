import { Flavour } from "./flavour.model";
import { IceCreamType } from "./type.model";
import { Shape } from "./shape.model";

export class HttpService {

    flavours: Flavour[] = [
        {name: 'strawberry', imgPath: '../../assets/images/strawberry.svg', color: ['#ff655a', '#f44336']},
        {name: 'raspberry', imgPath: '../../assets/images/raspberry.svg', color: ['#f06292', '#e91e63']},
        {name: 'chocolate', imgPath: '../../assets/images/chocolate.svg', color: ['#794d3e', '#56362b']},
        {name: 'lemon', imgPath: '../../assets/images/lemon.svg', color: ['#ffee58', '#fdd835']}
    ];

    scoops: number[] = [1, 2, 3];

    types: IceCreamType[] = [
        {name: 'cone', imgPath: '../../assets/images/cone.svg'},
        {name: 'stick', imgPath: '../../assets/images/stick.svg'}
    ];

    shapes: Shape[] = [
        {name: 'oval', imgPath: '../../assets/images/stick.svg'},
        {name: 'cylinder', imgPath: '../../assets/images/cylinder.svg'},
        {name: 'rectangle', imgPath: '../../assets/images/rect.svg'},
        {name: 'triangle', imgPath: '../../assets/images/triangle.svg'}
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

    getShapes() {
        return this.shapes;
    }
}