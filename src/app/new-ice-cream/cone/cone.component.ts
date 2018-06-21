import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConeIceCream } from '../../cone-ice-cream.model';
import { Flavour } from '../../flavour.model';
import { IceCreamService } from '../../ice-cream.service';
import { HttpService } from '../../http.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-cone',
  templateUrl: './cone.component.html',
  styleUrls: ['./cone.component.scss']
})
export class ConeComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  constructor( private iceCreamService: IceCreamService, 
              private http: HttpService,
              private slService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router
            ) { }

  flavours: Flavour[];
  scoops: number[];

  ngOnInit() {
    
    this.flavours = this.http.getFlavours();
    this.scoops = this.http.getScoops();

  }

  onScoopsAmountSelect(scoopsAmount) {
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: {scoops: +scoopsAmount}})
  }

  onAddCone(form: NgForm) {
    let newIceCream = new ConeIceCream(form.value.flavourChosen, form.value.scoopsAmountChosen, 'cone');
    this.slService.addToShoppingList(newIceCream);
    this.form.reset();
  }

}
