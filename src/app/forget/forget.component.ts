import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators as Validators, AbstractControl } from '@angular/forms';
import { ForgetService } from './forget.service';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
  providers: [ForgetService]
})
export class ForgetComponent implements OnInit {

  resetForm: FormGroup;
  sentEmail: boolean = false;
  resetService: Promise<any>;
  msg: boolean = false;
  message;
  constructor(
    private formBuilder: FormBuilder,
    private service: ForgetService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    })
  }

  reset() {
    let email = this.resetForm.value.email;
    this.resetService = this.service.forget(email).then(
      (res: any) => {
        if (res.status == 200) {
          this.sentEmail = true;
          setTimeout(() => {
            this._router.navigate(['login']);
          }, 3000);
        }
        else {
          this.msg = true;
          this.message = res.msg;
          setTimeout(() => {
            this.message = res.msg;
          }, 2000);
        }
      }
    )
  }

}
