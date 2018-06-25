import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { IceCreamService } from '../ice-cream.service';
import { HttpService } from '../http.service';
import { IceCreamType } from '../type.model';
import { Flavour } from '../flavour.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { IceCream } from '../ice-cream.model';

@Component({
  selector: 'app-new-ice-cream',
  templateUrl: './new-ice-cream.component.html',
  styleUrls: ['./new-ice-cream.component.scss']
})
export class NewIceCreamComponent implements OnInit {

  // @ViewChild('f') form: NgForm;

  constructor(private iceCreamService: IceCreamService, 
              private http: HttpService,
              private slService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) { }

  iceCreamType: IceCreamType[];
  flavours: Flavour[];
  scoops: number[];
  iceCreamTypeChosen: string;
  flavourChosen: string;
  scoopsAmountChosen: number;


  icForm = new FormGroup({
    typeChosen: new FormControl(),
    scoopsAmountChosen: new FormControl(),
    flavourChosen: new FormControl({
      value: '',
      disabled: !this.scoopsAmountChosen
    })}
  )

  ngOnInit() {    
    
    this.iceCreamType = this.http.getTypes();
    this.flavours = this.http.getFlavours();

    this.icForm.valueChanges
      .subscribe(
        (formValues) => {
          if(formValues.typeChosen) {
            if(this.iceCreamTypeChosen !== formValues.typeChosen) {
              this.icForm.reset();
            }
            this.iceCreamTypeChosen = formValues.typeChosen;

            const queryParams: Params = Object.assign({});
            queryParams['flav'] = null;
            queryParams['scoops'] = null;

            if(this.flavourChosen) {
              queryParams['flav'] = this.flavourChosen;
            }

            if(this.iceCreamTypeChosen === 'cone') {
              if(this.scoopsAmountChosen) {
                queryParams['scoops'] = this.scoopsAmountChosen;
              }
            }

            this.router.navigate(['/new', this.iceCreamTypeChosen], {relativeTo: this.route, queryParams: queryParams, queryParamsHandling: 'merge'});

          }
        }
      )

    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          if (params.get('type')) {
            console.log(this.icForm.controls['typeChosen'].patchValue(params.get('type')));
            this.icForm.patchValue({typeChosen: params.get('type')})

            if(this.iceCreamTypeChosen === 'cone') {
              this.scoops = this.http.getScoops();
            } else {
              this.scoops = null;
            }
          }
        }
      )

  this.route.queryParamMap
    .subscribe(
      (params: ParamMap) => {
        this.scoopsAmountChosen = +params.get('scoops') || null;
        this.flavourChosen = params.get('flav') || null;
      }
    )

  }

  onAddIceCream() {
    this.flavourChosen = this.icForm.value.flavourChosen;
    this.scoopsAmountChosen = this.icForm.value.scoopsAmountChosen;
    let newIceCream = new IceCream(this.iceCreamTypeChosen, this.flavourChosen, this.scoopsAmountChosen);
    this.slService.addToShoppingList(newIceCream);
    this.icForm.reset();
    this.router.navigate(['/new'], {queryParams: {}});
  }




}
