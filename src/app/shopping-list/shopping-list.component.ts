import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { IceCream } from '../ice-cream.model';
import { svgService } from '../svg.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  providers: [svgService]
})
export class ShoppingListComponent implements OnInit, AfterViewInit {

  constructor(private slService: ShoppingListService, 
              private svgService: svgService) { }

  shoppingList: IceCream[];

  ngOnInit() {
    this.shoppingList = this.slService.shoppingList;
    console.log(this.shoppingList);

    this.slService.shoppingListUpdated
      .subscribe(
        (updatedShoppingList: IceCream[]) => {
          this.shoppingList = updatedShoppingList;   
          console.log(this.shoppingList);
              
        }
      )
  }

  ngAfterViewInit() {
    this.generateSvg();
  }

  generateSvg() {
    this.shoppingList.forEach((el: IceCream, i: number) => {
      let parent = document.getElementsByClassName('preview')[i];

      this.svgService.initPreview(document.getElementsByClassName('svg-wrapper')[i]);
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
