import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';

import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private loading = false;
  constructor(
    private router: Router,
    private appService: AppService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.setLoginForm();
  }

  setLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('',
        Validators.compose(
          [
            Validators.minLength(5),
            Validators.required
          ],
        )),
      password: new FormControl('',
        Validators.compose(
          [
            Validators.minLength(8),
            Validators.required
          ],
        ))
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.toasterService.pop('error', '', 'Refresh the page and try again');
    } else {
      this.loading = true;
      this.appService.login(this.loginForm.value)
        .subscribe(
          (response) => {
            this.loading = false;
            if (response.error) {
              this.toasterService.pop('error', '', response.message);
            } else {
              this.router.navigate([`/home/${response.userId}`]);
            }
          },
          (error) => {
            this.loading = false;
            this.toasterService.pop('error', '', 'Invalid username and password combination');
          }
        );
    }
  }

}
