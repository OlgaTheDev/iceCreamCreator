import { Component, OnInit } from '@angular/core';

import { IceCreamService } from '../ice-cream.service';

@Component({
  selector: 'app-new-ice-cream',
  templateUrl: './new-ice-cream.component.html',
  styleUrls: ['./new-ice-cream.component.scss']
})
export class NewIceCreamComponent implements OnInit {

  constructor(private iceCreamService: IceCreamService) { }

  ngOnInit() {
  }


}
