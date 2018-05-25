import { Component, OnInit, group } from '@angular/core';
import { FormBuilder, FormGroup, Validators as Validators, AbstractControl } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginService: Promise<any>;
  invalidLogin = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  login(value) {
    this.loginService = this.service.login(value).then(
      (res: any) => {
        if (res.status == 200) {
          localStorage.setItem('token', res.data.token);
          this._router.navigate(['/dashboard']);
        }
        else {
          this.invalidLogin = true;
        }
      }
    )
  }

}
