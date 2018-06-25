import { Component, OnInit } from '@angular/core';

import { IceCreamService } from '../../ice-cream.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-ice-cream-preview',
  templateUrl: './ice-cream-preview.component.html',
  styleUrls: ['./ice-cream-preview.component.scss']
})
export class IceCreamPreviewComponent implements OnInit {

  iceCreamType: string;
  scoopsAmount: number;

  constructor(private iceCreamService: IceCreamService, 
              private route: ActivatedRoute,
              private router: Router ) { }

  iceCreamTypeChosen: string;
  scoopsAmountChosen: number;
  flavourChosen: string;

  ngOnInit() {

    this.route.queryParamMap
      .subscribe(
        (params: ParamMap) => {
          this.scoopsAmountChosen = +params.get('scoops');
          this.flavourChosen = params.get('flav');
        }
      )

    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          this.iceCreamTypeChosen = params.get('type');
          console.log(this.iceCreamTypeChosen)
        }
      )

  }

}
