import { Component, OnInit } from '@angular/core';

import { IceCreamService } from '../../ice-cream.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-ice-cream-preview',
  templateUrl: './ice-cream-preview.component.html',
  styleUrls: ['./ice-cream-preview.component.scss']
})
export class IceCreamPreviewComponent implements OnInit {

  iceCreamType: string;

  constructor(private iceCreamService: IceCreamService, 
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          console.log(params)
        }
      )

    this.route.queryParamMap
      .subscribe(
        params => {
          console.log(params)
        }
      )
  }

}
