import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { svgService } from '../shared/services/svg.service';
import { IceCream } from '../shared/models/ice-cream.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: [svgService]
})
export class ShoppingListComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private slService: ShoppingListService, 
              private svgService: svgService) {}

  shoppingList: IceCream[];
  orderSummary: number;
  subs: Subscription;
  minNum: number = 1;
  maxNum: number = 1000;

  ngOnInit() {
    this.shoppingList = this.slService.shoppingList;
    this.orderSummary = this.calcOrderSummary(this.shoppingList);       

    this.subs = this.slService.shoppingListUpdated
      .subscribe(
        (updatedShoppingList: IceCream[]) => {
          this.shoppingList = updatedShoppingList; 
          this.orderSummary = this.calcOrderSummary(this.shoppingList);       
        }
      )
  }

  ngAfterViewInit() {
    this.generateSvg();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onDelete(id:number) {
    this.slService.deleteFromShoppingList(id);
  }

  onQuantityChange(valid) {
    if (valid) {
      this.slService.shoppingListUpdated.next(this.shoppingList);
    } else {
      
    } 
  }

  private calcOrderSummary(shoppingList: IceCream[]) {
    let total = 0;
    shoppingList.forEach((iceCream: IceCream) => {
      total += iceCream.price * iceCream.quantity;      
    });
    return total;
  }

  private generateSvg() {
    this.shoppingList.forEach((el: IceCream, i: number) => {
      this.svgService.initPreview(document.getElementsByClassName('svg-wrapper')[i]);

      let parent = document.getElementsByClassName('preview')[i];
      
      this.svgService.initType(el.type, parent);
      if(el.scoopsAmount) {
        this.svgService.initScoops(el.scoopsAmount, parent);
      }
      if(el.shape) {
        this.svgService.initShape(el.shape, parent);
      }
      this.svgService.colorIceCream(el.flavour, parent);
    })
  }







}
