import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @ViewChild('alert') alertBlock: ElementRef;

  alertMsg: string;
  showMsgFlag: boolean = false;

  constructor( private alert: AlertService) { }

  ngOnInit() {

    this.alert.showAlert
      .subscribe(
        (obj: {submitted: boolean, msg: string}) => {
          this.alertMsg = obj.msg;
          this.showMsgFlag = obj.submitted;
          setTimeout(() => {
            this.showMsgFlag = false;
          }, 1000)   
          this.addAlertClass(obj.submitted);
        }
      )
  }

  private addAlertClass(flag) {
    if (this.alertBlock){
      if (flag) {
        this.alertBlock.nativeElement.classList.add('alert-success');
      } else {
        this.alertBlock.nativeElement.classList.add('alert-danger');
      }
    }
  }

}
