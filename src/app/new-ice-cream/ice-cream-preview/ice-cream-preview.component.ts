import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { HttpService } from '../../http.service';
import { Flavour } from '../../flavour.model';
import { svgService } from '../../svg.service';

@Component({
  selector: 'app-ice-cream-preview',
  templateUrl: './ice-cream-preview.component.html',
  styleUrls: ['./ice-cream-preview.component.scss'],
  providers: [svgService]
})
export class IceCreamPreviewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpService,
              private svgService: svgService ) { }

  showInfoText: boolean = true;

  ngOnInit() {
    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          const type = params.get('type');
          if (type) {
            this.showInfoText = false;
            this.svgService.initPreview(document.getElementById('preview-wrapper'));            
            this.svgService.initType(type, document.getElementsByClassName('preview')[0]);
          }
        }
      )

    this.route.queryParamMap
      .subscribe(
        (params: ParamMap) => {
          const parent = document.getElementsByClassName('preview')[0];    

          const scoopsAmountChosen = +params.get('scoops');   
          if (parent) {
            if(scoopsAmountChosen) {
              this.svgService.initScoops(scoopsAmountChosen, parent);
            }
  
            const shapeChosen = params.get('shape');
            if(shapeChosen) {
              this.svgService.initShape(shapeChosen, parent);
            }
              
            this.svgService.colorIceCream(params.get('flav'), parent);              
          }   
        }
      )

  }
 


}
