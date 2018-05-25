import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators as Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { PasswordValidation } from './../common/password.validator';
import { ResetServiceService } from './reset-service.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  providers: [ResetServiceService]
})
export class ResetpasswordComponent implements OnInit {

  passForm: FormGroup;
  passService: Promise<any>;
  paramdata;
  msg: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private service: ResetServiceService,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.passForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      cpassword: ['', Validators.compose([Validators.required])],
    }, {
      validator: PasswordValidation.MatchPassword
    })
    this.activatedRoute.params.subscribe((params: Params) => {    
      this.paramdata = params.token;
    });
  }

  changePassword(formValue) {
    let data = {
      password: formValue.password,
      token: this.paramdata
    }
    this.passService = this.service.resetPassword(data).then(
      (res: any) => {
        if (res.status == 200) {
          this.msg = true;
          setTimeout(() => {
            this._router.navigate(['/login']);
          })
        }
      }
    )
  }

}
