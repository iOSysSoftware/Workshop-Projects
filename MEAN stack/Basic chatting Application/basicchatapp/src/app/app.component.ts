import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/* Service import starts */
import { AppService } from './app.service';
/* Service import ends */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = false; /* Loading Overlay Property */
  registeredUser = false; /* To check if User is registered Property */
  singupForm: FormGroup = null; /* Singup Form Property */
  messageForm: FormGroup = null; /* Message Form Property */
  username: string = null; /* Header Username Property */
  messages: string[] = []; /* Array of messages Property */

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.createAppForms();
  }
  /**
   * Method to create singup form and Message Text Form
   */
  createAppForms() {
    this.singupForm = new FormGroup({
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      )
    });
    this.messageForm = new FormGroup({
      message: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      )
    });
  }

  /**
   * Method to handle submission of  singup form
   */
  submitSingUpForm() {
    if (this.singupForm.valid) {
      this.loading = true;
      this.registeredUser = true;
      this.appService.singUp(this.singupForm.value)
        .subscribe( (response: any) => {
          this.loading = false;
          this.registeredUser = true;
          this.username = response.username;

          this.appService.connectSocket();
          this.receiveMessage();
        }, () => {
          this.loading = false;
          this.registeredUser = false;
          alert('Unable to singup.');
        });
    } else {
      alert('Enter proper Username');
    }
  }

  /**
   * Method to handle incoming socket events
   */
  receiveMessage() {
    this.appService.receiveMessages().subscribe((response: any) => {
      this.messages.push(response.message);
    });
  }

  /**
   * Method to send the message
   */
  sendMessage(event) {
    if (event.keyCode === 13) {
      const message = this.messageForm.controls['message'].value.trim();
      this.appService.sendMessage(`${this.username} said: ${message}`);
      this.messageForm.controls['message'].setValue('');
    }
  }

}
