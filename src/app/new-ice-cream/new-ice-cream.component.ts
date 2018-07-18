import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpService } from '../http.service';
import { IceCreamType } from '../type.model';
import { Flavour } from '../flavour.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { IceCream } from '../ice-cream.model';
import { Shape } from '../shape.model';

@Component({
  selector: 'app-new-ice-cream',
  templateUrl: './new-ice-cream.component.html',
  styleUrls: ['./new-ice-cream.component.scss']
})
export class NewIceCreamComponent implements OnInit {

  constructor(private http: HttpService,
              private slService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) { }

  iceCreamType: IceCreamType[];
  flavours: Flavour[];
  scoops: number[];
  iceCreamTypeChosen: string;
  flavourChosen: string;
  scoopsAmountChosen: number = 1;
  shapes: Shape[];
  shapeChosen: string = 'oval';


  icForm = new FormGroup({
    typeChosen: new FormControl(null, Validators.required),
    scoopsAmountChosen: new FormControl({value: 1}),
    flavourChosen: new FormControl(null, Validators.required),
    shapeChosen: new FormControl({value: 'oval'})
  })

  ngOnInit() {    
    
    this.iceCreamType = this.http.getTypes();
    this.flavours = this.http.getFlavours();
    this.shapes = this.http.getShapes();

    this.icForm.valueChanges
      .subscribe(
        (formValues) => {
          if(formValues.typeChosen) {
            if(this.iceCreamTypeChosen !== formValues.typeChosen) {
              this.icForm.reset();
              if (formValues.typeChosen === 'cone') {
                this.scoopsAmountChosen = 1;
              } else {
                this.shapeChosen = 'oval';
              }
            }
            this.iceCreamTypeChosen = formValues.typeChosen;

            const queryParams: Params = Object.assign({});
            queryParams['flav'] = null;
            queryParams['scoops'] = null;
            queryParams['shape'] = null;

            if(this.flavourChosen) {
              queryParams['flav'] = this.flavourChosen;
            }

            if(this.iceCreamTypeChosen === 'cone') {
              if(this.scoopsAmountChosen) {
                queryParams['scoops'] = this.scoopsAmountChosen;
              }
            } else {
              if(this.shapeChosen) {
                queryParams['shape'] = this.shapeChosen;
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
              this.shapes = null;
            } else {
              this.scoops = null;
              this.shapes = this.http.getShapes();
            }
          }
        }
      )

  this.route.queryParamMap
    .subscribe(
      (params: ParamMap) => {
        this.scoopsAmountChosen = +params.get('scoops') || null;
        this.flavourChosen = params.get('flav') || null;
        this.shapeChosen = params.get('shape') || null;
      }
    )

  }

  onAddIceCream() {
    // const iceCreamCreated = {
    //   type: this.route.snapshot.params['type'],
    //   scoops: this.route.snapshot.queryParams['scoops'],
    //   flav: this.route.snapshot.queryParams['flav'],
    //   shape: this.route.snapshot.queryParams['shape']
    // }

    let newIceCream = new IceCream(
      this.iceCreamTypeChosen, 
      this.flavourChosen, 
      this.scoopsAmountChosen, 
      this.shapeChosen
    );
    this.slService.addToShoppingList(newIceCream);
    this.icForm.reset();
    this.router.navigate(['/new'], {queryParams: {}});
  }




}
