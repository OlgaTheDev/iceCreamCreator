import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { IceCreamService } from '../../ice-cream.service';
import { HttpService } from '../../http.service';
import { Flavour } from '../../flavour.model';

@Component({
  selector: 'app-ice-cream-preview',
  templateUrl: './ice-cream-preview.component.html',
  styleUrls: ['./ice-cream-preview.component.scss']
})
export class IceCreamPreviewComponent implements OnInit {

  constructor(private iceCreamService: IceCreamService, 
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpService ) { }

  flavours: Flavour[];
  showInfoText: boolean = true;

  ngOnInit() {

    this.flavours = this.http.getFlavours();
    
    this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          const type = params.get('type');
          if (type) {
            this.showInfoText = false;
            this.initPreview();
            this.initType(type, document.getElementById('preview'));
          }
        }
      )

    this.route.queryParamMap
      .subscribe(
        (params: ParamMap) => {
          const scoopsAmountChosen = +params.get('scoops');          
          if(scoopsAmountChosen) {
            this.initScoops(scoopsAmountChosen, document.getElementById('preview'));
          }

          const shapeChosen = params.get('shape');
          if(shapeChosen) {
            this.initShape(shapeChosen, document.getElementById('preview'));
          }

          this.colorIceCream(params.get('flav'));          
        }
      )

  }
 
  private initPreview() {
    const parent = document.getElementById('preview-wrapper');

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null,"id", "preview");
    svg.setAttributeNS(null,"x", "0");
    svg.setAttributeNS(null,"y", "0");
    svg.setAttributeNS(null,"viewBox", "0 0 512 512");
    
    parent.appendChild(svg);
  }

  private initType(type, parent) {
    this.destroyOldSvg(document.getElementsByClassName('type'), parent);

    if (type === 'cone') {
      const cone = document.createElementNS('http://www.w3.org/2000/svg',"g");
      cone.setAttributeNS(null, "class", "type");

      const conePath1 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const conePath2 = document.createElementNS('http://www.w3.org/2000/svg',"polygon");
      const conePath3 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      
      conePath1.setAttributeNS(null, "d", "M343.293,256.66l-0.286,0.899l-5.267,16.558l-5.309,16.733h-0.017l-68.413,215.296  c-1.235,3.907-4.611,5.855-7.998,5.855c-3.377,0-6.771-1.948-8.005-5.855l-32.485-102.217l-41.255-129.812l-1.537-4.83l-3.73-11.727  l-0.151-0.479l-0.135-0.42L343.293,256.66L343.293,256.66z");  
      conePath1.setAttributeNS(null, "fill", "#FFD41D");
      conePath2.setAttributeNS(null, "points", "343.293,257.08 339.277,269.286 172.723,269.286 168.993,257.558 168.841,257.08");  
      conePath2.setAttributeNS(null, "fill", "#FFA91F");
      conePath3.setAttributeNS(null, "d", "M236.573,403.928l-41.255-129.812l-1.537-4.83l-3.73-11.727l-0.151-0.479l-0.135-0.42h-21.058   l0.135,0.42l0.151,0.479l3.73,11.727l1.537,4.83l41.255,129.812l32.485,102.217c1.235,3.907,4.629,5.855,8.005,5.855   c3.385,0,6.763-1.948,7.998-5.855l2.527-7.954L236.573,403.928z");
      conePath3.setAttributeNS(null, "fill", "#FFA91F");
  
      cone.appendChild(conePath1);
      cone.appendChild(conePath2);
      cone.appendChild(conePath3);

      parent.appendChild(cone);

    } else {
      const stick = document.createElementNS('http://www.w3.org/2000/svg',"g");
      stick.setAttributeNS(null, "class", "type");

      const stickPath1 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const stickPath2 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const stickPath3 = document.createElementNS('http://www.w3.org/2000/svg',"rect");
  
      stickPath1.setAttributeNS(null, "d", "M290.554,352.865v124.587c0,19.087-15.473,34.548-34.548,34.548  c-19.087,0-34.548-15.461-34.548-34.548V352.865H290.554z");
      stickPath1.setAttributeNS(null, "fill", "#F9DB87");
      stickPath2.setAttributeNS(null, "d", "M245.08,477.452V355.227h-23.623v122.224c0,19.087,15.461,34.548,34.548,34.548   c4.147,0,8.124-0.732,11.809-2.073C254.55,505.103,245.08,492.388,245.08,477.452z")
      stickPath2.setAttributeNS(null, "fill", "#E5B94C");
      stickPath3.setAttributeNS(null, "x", "221.464");
      stickPath3.setAttributeNS(null, "y", "355.227");
      stickPath3.setAttributeNS(null, "width", "69.097");
      stickPath3.setAttributeNS(null, "height", "27.048");
      stickPath3.setAttributeNS(null, "fill", "#E5B94C");
  
      stick.appendChild(stickPath1);
      stick.appendChild(stickPath2);
      stick.appendChild(stickPath3);

      parent.appendChild(stick);
    }
    
  }

  initScoops(scoopsAmount, parent) {
    this.destroyOldSvg(document.getElementsByClassName('form'), parent);

    const scoops = document.createElementNS('http://www.w3.org/2000/svg',"g");
    scoops.setAttributeNS(null, "class", "form");

    const scoopPath1 = document.createElementNS('http://www.w3.org/2000/svg',"path");
    const scoopPath2 = document.createElementNS('http://www.w3.org/2000/svg',"path");
    scoopPath1.setAttributeNS(null, "d", "M351.726,229.947c-1.746-1.757-3.901-3.104-6.305-3.901c-0.539-0.183-1.099-0.334-1.66-0.463  c-3.319-45.565-41.351-81.506-87.756-81.506c-46.416,0-84.448,35.941-87.767,81.506c-0.56,0.129-1.121,0.28-1.66,0.463  c-6.423,2.145-11.057,8.212-11.057,15.368c0,1.821,0.291,3.556,0.851,5.184c0.798,2.392,2.155,4.537,3.89,6.294  c2.586,2.586,6.024,4.278,9.85,4.666c0.528,0.054,1.078,0.086,1.627,0.086h0.022h168.475h0.022c0.55,0,1.099-0.032,1.627-0.086  c1.196-0.119,2.349-0.366,3.459-0.733c0.226-0.075,0.453-0.151,0.668-0.237c0.216-0.086,0.431-0.172,0.647-0.259  c0.216-0.097,0.431-0.194,0.636-0.291c0.151-0.075,0.291-0.14,0.442-0.216c0.183-0.097,0.356-0.194,0.539-0.302  c0.205-0.119,0.41-0.237,0.614-0.366c1.045-0.657,2.004-1.423,2.856-2.285c0.172-0.172,0.334-0.345,0.507-0.517  c0.507-0.571,0.981-1.175,1.412-1.8c0.129-0.183,0.248-0.356,0.356-0.539c0.517-0.83,0.97-1.714,1.326-2.64  c0.086-0.216,0.172-0.431,0.248-0.647c0.086-0.259,0.162-0.507,0.237-0.765c0.075-0.237,0.14-0.485,0.194-0.722  c0.054-0.205,0.097-0.41,0.14-0.614c0.022-0.151,0.054-0.291,0.075-0.442c0.032-0.194,0.065-0.377,0.086-0.571  c0.097-0.722,0.151-1.455,0.151-2.198C356.479,236.941,354.668,232.889,351.726,229.947z")
    scoopPath1.setAttributeNS(null, "class", "light");
    scoopPath2.setAttributeNS(null, "d", "M181.321,252.891c-1.735-1.757-3.093-3.901-3.89-6.294c-0.56-1.627-0.851-3.362-0.851-5.184   c0-7.156,4.634-13.223,11.057-15.368c0.539-0.183,1.099-0.334,1.66-0.463c3.064-42.064,35.72-75.902,77.237-80.857   c-3.454-0.413-6.963-0.649-10.528-0.649c-46.416,0-84.448,35.941-87.767,81.506c-0.56,0.129-1.121,0.28-1.66,0.463   c-6.423,2.145-11.057,8.212-11.057,15.368c0,1.821,0.291,3.556,0.851,5.184c0.798,2.392,2.155,4.537,3.89,6.294   c2.586,2.586,6.024,4.278,9.85,4.666c0.528,0.054,1.078,0.086,1.627,0.086h0.022h21.037c-0.55,0-1.099-0.032-1.627-0.086   C187.346,257.169,183.908,255.477,181.321,252.891z")
    scoopPath2.setAttributeNS(null, "class", "dark");
    scoops.appendChild(scoopPath1);
    scoops.appendChild(scoopPath2);

    if (scoopsAmount >= 2) {
      const scoopPath3 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const scoopPath4 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const scoopPath5 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      scoopPath3.setAttributeNS(null, "d", "M335.42,194.119H176.58c1.412-2.931,2.964-5.776,4.688-8.514h149.465   C332.457,188.343,334.019,191.188,335.42,194.119z");
      scoopPath3.setAttributeNS(null, "class", "dark");
      scoopPath4.setAttributeNS(null, "d", "M351.726,157.909c-1.746-1.757-3.901-3.115-6.305-3.912c-0.259-0.086-0.528-0.172-0.797-0.237  c-0.28-0.086-0.571-0.151-0.862-0.216c0-0.002,0-0.003,0-0.005c-0.808-11.197-3.729-21.812-8.341-31.458  c-1.401-2.931-2.964-5.776-4.688-8.514c-15.519-24.927-43.194-41.523-74.727-41.523c-31.544,0-59.208,16.596-74.738,41.523  c-1.724,2.737-3.276,5.582-4.688,8.514c-4.613,9.645-7.522,20.261-8.341,31.458c0,0.002,0,0.003,0,0.005  c-0.56,0.119-1.121,0.269-1.66,0.453c-6.423,2.155-11.057,8.223-11.057,15.379c0,1.821,0.291,3.556,0.851,5.173  c0.798,2.403,2.155,4.537,3.89,6.294c2.586,2.597,6.024,4.289,9.85,4.677c0.528,0.054,1.078,0.086,1.627,0.086h168.518  c0.55,0,1.099-0.032,1.627-0.086c0.474-0.043,0.938-0.119,1.401-0.205c0.032,0,0.075-0.011,0.119-0.022  c0.313-0.065,0.614-0.129,0.927-0.216c0.345-0.086,0.679-0.183,1.013-0.291c0.226-0.075,0.453-0.162,0.668-0.237  c0.323-0.119,0.636-0.248,0.948-0.388c0.011-0.011,0.011-0.011,0.022-0.011c0.323-0.151,0.625-0.302,0.938-0.474  c0.388-0.205,0.776-0.431,1.142-0.679c0.216-0.129,0.41-0.269,0.614-0.41c0.194-0.14,0.377-0.28,0.56-0.42  c0.237-0.183,0.474-0.377,0.7-0.582c0.043-0.032,0.086-0.075,0.129-0.119c0.237-0.205,0.463-0.42,0.679-0.647  c1.552-1.552,2.791-3.416,3.599-5.485c0.086-0.194,0.162-0.399,0.226-0.604c0.302-0.862,0.528-1.746,0.679-2.662  c0.032-0.162,0.054-0.334,0.075-0.507c0.054-0.366,0.086-0.722,0.108-1.088c0.032-0.356,0.043-0.722,0.043-1.099  C356.479,164.892,354.668,160.84,351.726,157.909z");
      scoopPath4.setAttributeNS(null, "class", "light");
      scoopPath5.setAttributeNS(null, "d", "M181.321,180.842c-1.735-1.757-3.093-3.89-3.89-6.294c-0.56-1.617-0.851-3.352-0.851-5.173   c0-7.156,4.634-13.223,11.057-15.379c0.539-0.183,1.099-0.334,1.66-0.453c0-0.002,0-0.003,0-0.005   c0.819-11.197,3.729-21.812,8.341-31.458c1.412-2.931,2.964-5.776,4.688-8.514c13.774-22.11,37.1-37.655,64.208-40.889   c-3.453-0.412-6.964-0.635-10.528-0.635c-31.544,0-59.208,16.596-74.738,41.523c-1.724,2.737-3.276,5.582-4.688,8.514   c-4.613,9.645-7.522,20.261-8.341,31.458c0,0.002,0,0.003,0,0.005c-0.56,0.119-1.121,0.269-1.66,0.453   c-6.423,2.155-11.057,8.223-11.057,15.379c0,1.821,0.291,3.556,0.851,5.173c0.798,2.403,2.155,4.537,3.89,6.294   c2.586,2.597,6.024,4.289,9.85,4.677c0.528,0.054,1.078,0.086,1.627,0.086h21.058c-0.55,0-1.099-0.032-1.627-0.086   C187.346,185.131,183.908,183.439,181.321,180.842z");
      scoopPath5.setAttributeNS(null, "class", "dark");
      scoops.appendChild(scoopPath3);
      scoops.appendChild(scoopPath4);
      scoops.appendChild(scoopPath5);
    }  
    if(scoopsAmount >= 3) {
      const scoopPath6 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const scoopPath7 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const scoopPath8 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      scoopPath6.setAttributeNS(null, "d", "M335.42,122.081H176.58c1.412-2.931,2.964-5.776,4.688-8.514h149.465   C332.457,116.304,334.019,119.149,335.42,122.081z");
      scoopPath6.setAttributeNS(null, "class", "dark");
      scoopPath7.setAttributeNS(null, "d", "M351.726,85.87c-1.746-1.757-3.901-3.115-6.305-3.912c-0.259-0.086-0.528-0.172-0.797-0.237  c-0.28-0.086-0.571-0.151-0.862-0.216C340.453,35.952,302.422,0,256.005,0c-46.427,0-84.459,35.952-87.767,81.506  c-0.56,0.119-1.121,0.269-1.66,0.453c-6.423,2.155-11.057,8.223-11.057,15.379c0,1.821,0.291,3.556,0.851,5.173  c0.798,2.403,2.155,4.537,3.89,6.294c2.586,2.597,6.024,4.289,9.85,4.677c0.528,0.054,1.078,0.086,1.627,0.086h0.022h168.475h0.022  c0.55,0,1.099-0.032,1.627-0.086c0.474-0.043,0.938-0.119,1.401-0.205c0.032,0,0.075-0.011,0.119-0.022  c0.313-0.065,0.614-0.129,0.927-0.216c0.345-0.086,0.679-0.183,1.013-0.291c0.226-0.075,0.453-0.162,0.668-0.237  c0.323-0.119,0.636-0.248,0.948-0.388c0.011-0.011,0.011-0.011,0.022-0.011c0.323-0.151,0.625-0.302,0.938-0.474  c0.388-0.205,0.776-0.431,1.142-0.679c0.216-0.129,0.41-0.269,0.614-0.41c0.194-0.14,0.377-0.28,0.56-0.42  c0.237-0.183,0.474-0.377,0.701-0.582c0.043-0.032,0.086-0.075,0.129-0.119c0.237-0.205,0.463-0.42,0.679-0.647  c1.552-1.552,2.791-3.416,3.599-5.485c0.086-0.194,0.162-0.399,0.226-0.604c0.302-0.862,0.528-1.746,0.679-2.662  c0.032-0.162,0.054-0.334,0.075-0.507c0.054-0.366,0.086-0.722,0.108-1.088c0.032-0.356,0.043-0.722,0.043-1.099  C356.479,92.854,354.668,88.802,351.726,85.87z");
      scoopPath7.setAttributeNS(null, "class", "light");
      scoopPath8.setAttributeNS(null, "d", "M181.321,108.804c-1.735-1.757-3.093-3.89-3.89-6.294c-0.56-1.617-0.851-3.352-0.851-5.173  c0-7.156,4.634-13.223,11.057-15.379c0.539-0.183,1.099-0.334,1.66-0.453c3.054-42.055,35.71-75.902,77.237-80.857  C263.079,0.237,259.57,0,256.005,0c-46.427,0-84.459,35.952-87.767,81.506c-0.56,0.119-1.121,0.269-1.66,0.453  c-6.423,2.155-11.057,8.223-11.057,15.379c0,1.821,0.291,3.556,0.851,5.173c0.798,2.403,2.155,4.537,3.89,6.294  c2.586,2.597,6.024,4.289,9.85,4.677c0.528,0.054,1.078,0.086,1.627,0.086h0.022h21.037c-0.55,0-1.099-0.032-1.627-0.086  C187.346,113.093,183.908,111.401,181.321,108.804z");
      scoopPath8.setAttributeNS(null, "class", "dark");
      scoops.appendChild(scoopPath6);
      scoops.appendChild(scoopPath7);
      scoops.appendChild(scoopPath8);
    }

    parent.appendChild(scoops);
  }

  initShape(shapeChosen, parent) {
    this.destroyOldSvg(document.getElementsByClassName('form'), parent);

    const shape = document.createElementNS('http://www.w3.org/2000/svg',"g");
    shape.setAttributeNS(null, "class", "form");

    if (shapeChosen === 'oval') {
      const shapePath1 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const shapePath2 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      shapePath1.setAttributeNS(null, "d", "M376.47,120.476v209.699c0,13.831-11.209,25.052-25.04,25.052H160.582  c-13.831,0-25.052-11.221-25.052-25.052V120.476C135.53,53.943,189.472,0,256.006,0S376.47,53.943,376.47,120.476z");
      shapePath1.setAttributeNS(null, "class", "light");
      shapePath2.setAttributeNS(null, "d", "M159.153,330.176V120.476c0-62.547,47.674-113.962,108.665-119.899C263.931,0.2,259.992,0,256.006,0  C189.472,0,135.53,53.943,135.53,120.476v209.699c0,13.831,11.221,25.052,25.052,25.052h23.623  C170.373,355.227,159.153,344.007,159.153,330.176z");
      shapePath2.setAttributeNS(null, "class", "dark");

      shape.appendChild(shapePath1);
      shape.appendChild(shapePath2);
    }

    if (shapeChosen === 'rectangle') {
      const shapePath3 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const shapePath4 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      shapePath3.setAttributeNS(null, "d", "M328.077,353.583H183.923c-15.206,0-27.296-12.783-26.437-27.976l17.032-300.626  C175.305,10.969,186.907,0,200.942,0h110.115c14.048,0,25.649,10.969,26.437,24.981l17.02,300.626  C355.373,340.8,343.295,353.583,328.077,353.583z");
      shapePath3.setAttributeNS(null, "class", "light");
      shapePath4.setAttributeNS(null, "d", "M181.447,325.607l17.032-300.626C199.267,10.969,210.868,0,224.904,0h-23.961  c-14.036,0-25.637,10.969-26.425,24.981l-17.032,300.626c-0.859,15.194,11.231,27.976,26.437,27.976h23.961  C192.679,353.583,180.588,340.8,181.447,325.607z");
      shapePath4.setAttributeNS(null, "class", "dark");

      shape.appendChild(shapePath3);
      shape.appendChild(shapePath4);
    }

    if (shapeChosen === 'triangle') {
      const shapePath5 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const shapePath6 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const shapePath7 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      const shapePath8 = document.createElementNS('http://www.w3.org/2000/svg',"path");
      shapePath5.setAttributeNS(null, "d", "M359.382,358.824H152.618c-22.274,0-37.865-22.008-30.479-43.024L225.521,21.593  C230.576,7.19,243.282,0,256,0c12.706,0,25.413,7.19,30.479,21.593l103.382,294.208  C397.247,336.816,381.656,358.824,359.382,358.824z");
      shapePath6.setAttributeNS(null, "d", "M144.717,315.801L248.099,21.593c3.53-10.058,10.795-16.586,19.186-19.617  C263.662,0.666,259.833,0,256,0c-12.718,0-25.424,7.19-30.479,21.593L122.139,315.801c-7.386,21.016,8.205,43.024,30.479,43.024  h22.578C152.923,358.824,137.331,336.816,144.717,315.801z");
      shapePath7.setAttributeNS(null, "d", "M359.382,358.824H152.618c-22.274,0-37.865-22.008-30.479-43.024h267.722  C397.247,336.816,381.656,358.824,359.382,358.824z");
      shapePath8.setAttributeNS(null, "d", "M144.717,315.801h-22.578c-7.386,21.016,8.205,43.024,30.479,43.024h22.578  C152.923,358.824,137.331,336.816,144.717,315.801z");

      shapePath5.setAttributeNS(null, "class", "light");
      shapePath6.setAttributeNS(null, "class", "dark");
      shapePath7.setAttributeNS(null, "class", "light");
      shapePath8.setAttributeNS(null, "class", "dark");

      shape.appendChild(shapePath5);
      shape.appendChild(shapePath6);
      shape.appendChild(shapePath7);
      shape.appendChild(shapePath8);
    }

    parent.appendChild(shape);

  }

  private destroyOldSvg(oldSvg, parent) {
    if(oldSvg.length) {
      for(let i = 0; i <= oldSvg.length; i++) {
        parent.removeChild(oldSvg[i])
      }
    }
  }

  private determineFlavourColors(flavChosen) {
    let flavourColorChosen = ['rgb(238, 238, 238)', 'rgb(221, 221, 221)'];
      for (let fl of this.flavours) {
        if (flavChosen === fl.name) {  
          flavourColorChosen = [];            
          flavourColorChosen.push(...fl.color);              
        }            
      }
      return flavourColorChosen;
  }

  private colorIceCream(colorChosen) {    
    const colors:string[] = this.determineFlavourColors(colorChosen);

    const lightParts = Array.from(document.querySelectorAll('.light'));
    const darkParts = Array.from(document.querySelectorAll('.dark'));
    
    lightParts.forEach((el: SVGElement) => {
      el.style.fill = colors[0];
    });
    darkParts.forEach((el: SVGElement) => {
      el.style.fill = colors[1];
    });
  }

}
