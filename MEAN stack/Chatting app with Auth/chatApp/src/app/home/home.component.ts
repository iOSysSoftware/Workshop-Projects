import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { AppService } from './../app.service';
import { IncomingMessage } from './../app-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private messageForm: FormGroup;
  private loading =  false;
  private userId: string = null;
  private username: string = null;
  private messages: string[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private toasterService: ToasterService
  ) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }

  ngOnInit() {
    this.userSessionCheck();
    this.setMessageForm();
  }

  userSessionCheck() {
    this.loading =  true;
    this.appService.userSessionCheck(this.userId)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response.error) {
            this.toasterService.pop('error', '', response.message);
          } else {
            this.username = response.username;
            this.appService.connectSocket();
            this.receiveMessage();
          }
        },
        (error) => {
          this.loading = false;
          this.toasterService.pop('error', '', 'Something went wrong and we are working on it.');
        }
      );
  }

  setMessageForm() {
    this.messageForm = new FormGroup({
      message: new FormControl(
        '',
        Validators.compose(
          [
            Validators.minLength(5),
            Validators.required
          ],
        )
      )
    });
  }

  logout() {
    this.loading = true;
    this.appService.logout(this.userId)
      .subscribe((response) => {
        this.loading = false;
        if (response.error) {
          this.toasterService.pop('error', '', response.message);
        } else {
          this.router.navigate([`/login`]);
        }
      });
  }

  sendMessage(event) {
    if (event.keyCode === 13) {
      const message = this.messageForm.controls['message'].value.trim();
      this.appService.sendMessage(message);
      this.messageForm.controls['message'].setValue('');
    }
  }

  receiveMessage() {
    this.appService.receiveMessages().subscribe((response: IncomingMessage) => {
      this.toasterService.pop('success', 'You received a new message', response.message);
      this.messages.push(response.message);
    });
  }
}
