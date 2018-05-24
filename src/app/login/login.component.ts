import { Component, OnInit, group } from '@angular/core';
import { FormBuilder, FormGroup, Validators as Validators, AbstractControl } from '@angular/forms';
import { validateEmail } from "./../common/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30), validateEmail])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])]
    })
  }

}
