import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';

import { AppService } from './../app.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private registrationForm: FormGroup;
  private loading = false;
  private userExits = false;
  constructor(
    private router: Router,
    private appService: AppService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.setRegistrationForm();
    this.checkAvailableUsername();
  }

  setRegistrationForm() {
    this.registrationForm = new FormGroup({
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

  checkAvailableUsername() {
    this.registrationForm.controls['username'].valueChanges
      .subscribe((value) => {
        if (value.length > 4) {
          this.loading = true;
          this.appService.usernameAvailable(value).subscribe(
            (response) => {
              this.loading = false;
              if (response.error) {
                this.userExits = true;
              } else {
                this.userExits = false;
              }
            },
            (error) => {
              this.loading = false;
              this.toasterService.pop('error', '', 'Something went wrong and we are working on it.');
            }
          );
        } else {
          this.userExits = false;
        }
      });
  }

  register() {
    this.loading = true;
    if (this.registrationForm.invalid) {
      this.toasterService.pop('error', '', 'Refresh the page and try again');
    } else {
      this.appService.registerUser(this.registrationForm.value)
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
            this.toasterService.pop('error', '', 'Something went wrong and we are working on it.');
          }
      );
    }
  }

}
