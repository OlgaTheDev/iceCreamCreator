import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Flavour } from '../../flavour.model';
import { IceCreamService } from '../../ice-cream.service';
import { HttpService } from '../../http.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { IceCream } from '../../ice-cream.model';
import { IceCreamType } from '../../type.model';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  constructor( private iceCreamService: IceCreamService, 
              private http: HttpService,
              private slService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router
            ) { }

  flavours: Flavour[];
  scoops: number[];
  iceCreamTypeChosen: string;
  flavourChosen: string;
  scoopsAmountChosen: number;

  ngOnInit() {
    this.flavours = this.http.getFlavours();

    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          console.log(params);
          this.iceCreamTypeChosen = params.get('type');
          if(this.iceCreamTypeChosen === 'cone') {
            this.scoops = this.http.getScoops();
          } else {
            this.scoops = null;
          }
          this.form.reset();
        }
      )

  }

  onScoopsAmountSelect(scoopsAmount) {
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: {scoops: +scoopsAmount}, queryParamsHandling: 'merge'});
  }

  onFlavourSelect(flav: string) {
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: {flavour: flav}, queryParamsHandling: 'merge'});
  }

  onAddIceCream(form: NgForm) {
    this.flavourChosen = form.value.flavourChosen;
    this.scoopsAmountChosen = form.value.scoopsAmountChosen;
    let newIceCream = new IceCream(this.iceCreamTypeChosen, this.flavourChosen, this.scoopsAmountChosen);
    this.slService.addToShoppingList(newIceCream);
    this.form.reset();
  }


}
