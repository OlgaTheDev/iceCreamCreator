import { Component, OnInit } from '@angular/core';

import { ParamMap } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { CalculationService } from '../../shared/services/calculation.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  typeChosen: string;
  scoopsChosen: string;
  shapeChosen: string;
  flavChosen: string;
  typePrice: number = 0;
  scoopsPrice: number;
  shapePrice: number;
  flavPrice: number;
  totalPrice: number = 0;

  constructor(private http: HttpService, private calc: CalculationService) { 

    this.calc.paramsChanged
      .subscribe(
        (iceCream) => {  
          this.typeChosen = iceCream.typeChosen;
          this.scoopsChosen = iceCream.scoopsAmountChosen;
          this.shapeChosen = iceCream.shapeChosen;
          this.flavChosen = iceCream.flavourChosen;
          this.typePrice = this.calc.calcTypePrice(this.typeChosen) || 0;
          this.scoopsPrice = this.calc.calcScoopsPrice(this.scoopsChosen) || 0;
          this.shapePrice = this.calc.calcShapePrice(this.shapeChosen) || 0;
          this.flavPrice = this.calc.calcFlavPrice(this.flavChosen) || 0;   
          this.totalPrice = this.calc.calcTotalPrice();       
        }
      )
  }


  ngOnInit() {

    
    

  }



}
