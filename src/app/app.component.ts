import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    if (window.matchMedia("(max-width: 719px)").matches) {
      this.renderViewForMob();
    } 
  }

  private renderViewForMob() {
    if (document.getElementById('goToSLBtn')) {
      document.getElementById('goToSLBtn').style.display = 'none';
      document.getElementById('triggerGoToSL').classList.add('visible');
      document.getElementById('new-ice-cream').style.paddingBottom ='80px';
    }
  }

}


