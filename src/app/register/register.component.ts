import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators as Validators, AbstractControl } from '@angular/forms';
import { validateEmail } from "./../common/common";
import { PasswordValidation } from './../common/password.validator';
import { RegisterService } from './register.service';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ RegisterService, FormBuilder ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  register: Promise<any>;
  mask: any[] = ['+', '9', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(
    private formBuilder: FormBuilder,
    private service: RegisterService,
    private zone: NgZone,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      lname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), validateEmail])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
      cname: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      cpassword: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(20)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(18)])]
    }, {
      validator: PasswordValidation.MatchPassword
    })
  }

  login(value) {
    let userDetails = this.registerForm.value;
    this.register = this.service.register(userDetails).then(
        (res: any) => {
          if (res.status == '200') {
            localStorage.setItem('token', res.data.token);
            this._router.navigate(['/dashboard']);
          }
          else {
            alert('Email already exist');
          }
        }
    )
  }

}
