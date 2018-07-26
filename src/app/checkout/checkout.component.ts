import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('truck') truck: ElementRef;

  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private checkout: CheckoutService) {}

  userForm = this.fb.group({
    fName: [null, [Validators.required, Validators.minLength(3)]],
    lName: [null, [Validators.required, Validators.minLength(3)]],
    email: [null, [Validators.required, Validators.email]],
    contactNum: [null, [Validators.required, Validators.pattern('^[0-9-+s()]*$')]],
    city: [null, Validators.required],
    address: [null, Validators.required]
  })

  ngOnInit() {
  }

  onSubmit() {
    this.goTruck();
    setTimeout(() => {
      this.router.navigate(['/finish']);
      this.checkout.orderPlaced.next(true);
    }, 600)
  }

  private goTruck() {
    this.truck.nativeElement.classList.add('go');
  }

  get fName() {
    return this.userForm.get('fName');
  }

  get lName() {
    return this.userForm.get('lName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get contact() {
    return this.userForm.get('contactNum');
  }

  get city() {
    return this.userForm.get('city');
  }

  get address() {
    return this.userForm.get('address');
  }
}
