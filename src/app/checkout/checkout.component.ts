import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {}

  userForm = this.fb.group({
    fName: [null, [Validators.required, Validators.minLength(3)]],
    lName: [null, [Validators.required, Validators.minLength(3)]],
    email: [null, [Validators.required, Validators.email]],
    contactNum: [null, [Validators.required, Validators.pattern('^[0-9-+s()]*$')]],
    city: [null, Validators.required],
    address: [null, Validators.required]
  })

  ngOnInit() {
    this.userForm.valueChanges
      .subscribe(
        (form: NgForm) => {
          console.log(form);
          
        }
      )
  }


  onSubmit() {
    console.log(this.userForm);
    this.goTruck();
    setTimeout(() => {
      this.formSubmitted = true;
    }, 600)
  }

  private goTruck() {
    document.getElementById('truck').classList.add('go');
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
