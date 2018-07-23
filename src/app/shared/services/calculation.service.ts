import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IceCreamType } from "../models/type.model";
import { Shape } from "../models/shape.model";
import { Flavour } from "../models/flavour.model";


@Injectable()
export class CalculationService {

    paramsChanged = new Subject<{typeChosen: string, scoopsAmountChosen: string, shapeChosen:  string, flavourChosen: string}>();

    types: IceCreamType[] = this.http.getTypes();
    shapes: Shape[] = this.http.getShapes();
    flavours: Flavour[] = this.http.getFlavours();

    typePrice: number;
    scoopsPrice: number;
    shapePrice: number;
    flavPrice: number;
    totalPrice: number;

    constructor(private http: HttpService) {}

    calcTypePrice(chosenType) {
        this.typePrice = this.calcPrice(chosenType, this.types);
        return this.typePrice;
    }

    calcShapePrice(shapeChosen) {
        this.shapePrice = this.calcPrice(shapeChosen, this.shapes);
        return this.shapePrice;
    }

    calcScoopsPrice(scoopsAmountChosen) {
        this.scoopsPrice = 0;
        for (let i = 1; i < scoopsAmountChosen; i++) {
            this.scoopsPrice += .6;
        }
        return this.scoopsPrice;
    }

    calcFlavPrice(flavChosen) {
        this.flavPrice = this.calcPrice(flavChosen, this.flavours);
        return this.flavPrice;
    }

    calcTotalPrice() {
        this.totalPrice =  this.typePrice + this.scoopsPrice + this.flavPrice + this.shapePrice;
        return this.totalPrice;
    }

    private calcPrice(chosenEl, array) {
        let price: number = 0;
        array.forEach(el => {
            if (chosenEl === el.name) {
                price = el.price;
            }  
        })
        return price;   
    }





}