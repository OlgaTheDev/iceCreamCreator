import { HttpService } from "./http.service";
import { Injectable } from "@angular/core";
import { Flavour } from "./flavour.model";
import { elementAt } from "rxjs/operator/elementAt";

@Injectable()
export class svgService {

    flavours: Flavour[];

    constructor(private httpService: HttpService) {
        this.flavours = this.httpService.getFlavours();        
    }

    initPreview(parent) {    
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null,"class", "preview");
        svg.setAttributeNS(null,"x", "0");
        svg.setAttributeNS(null,"y", "0");
        svg.setAttributeNS(null,"viewBox", "0 0 512 512");
        
        parent.appendChild(svg);
    }
    
    initType(typeChosen, parent) {
        this.destroyOldSvg(parent.getElementsByClassName('type'), parent);
    
        const type = document.createElementNS('http://www.w3.org/2000/svg',"g");
        type.setAttributeNS(null, "class", "type");
    
        const typeSvg = this.httpService.getSvgType();
        typeSvg.forEach(el => {
          for (let i in el) {
            if (i === typeChosen) {
                this.createPaths(el[i], type)
            }
          }
        })
        parent.appendChild(type);
    }
    
    initScoops(scoopsAmount, parent) {
        this.destroyOldSvg(parent.getElementsByClassName('form'), parent);
    
        const scoops = document.createElementNS('http://www.w3.org/2000/svg',"g");
        scoops.setAttributeNS(null, "class", "form");
    
        const scoopsArray = this.httpService.getSvgScoops();
        scoopsArray.forEach(el => {
          for (let i in el) {
            if (Number(i) <= Number(scoopsAmount)) {
              for (let j = 0; j < el[i].length; j++) {
                let scoopPath = document.createElementNS('http://www.w3.org/2000/svg',"path");              
                for (let h in el[i][j]) {
                  scoopPath.setAttributeNS(null, h, el[i][j][h])
                }  
                scoops.appendChild(scoopPath);                           
              }
            }
          }
        })
    
        parent.appendChild(scoops);
    }
    
    initShape(shapeChosen, parent) {
        this.destroyOldSvg(parent.getElementsByClassName('form'), parent);
    
        const shape = document.createElementNS('http://www.w3.org/2000/svg',"g");
        shape.setAttributeNS(null, "class", "form");
    
        const shapesArray = this.httpService.getSvgShapes();
        shapesArray.forEach(el => {
          for (let i in el) {
            if (i === shapeChosen) {
              for (let j = 0; j < el[i].length; j++) {
                let shapePath = document.createElementNS('http://www.w3.org/2000/svg',"path");              
                for (let h in el[i][j]) {
                  shapePath.setAttributeNS(null, h, el[i][j][h])
                }  
                shape.appendChild(shapePath);           
              }
            }
          }
        })
        parent.appendChild(shape);
    }

    private createPaths(elem, parent) {
        for (let j = 0; j < elem.length; j++) {            
            let path = document.createElementNS('http://www.w3.org/2000/svg', elem[j].type);
            for (let h in elem[j]) {
              path.setAttributeNS(null, h, elem[j][h])
            }  
            parent.appendChild(path);               
        }
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
    
    colorIceCream(colorChosen, parent) {    
        const colors:string[] = this.determineFlavourColors(colorChosen);
    
        const lightParts = Array.from(parent.querySelectorAll('.light'));
        const darkParts = Array.from(parent.querySelectorAll('.dark'));
        
        lightParts.forEach((el: SVGElement) => {
          el.style.fill = colors[0];
        });
        darkParts.forEach((el: SVGElement) => {
          el.style.fill = colors[1];
        });
    }

}