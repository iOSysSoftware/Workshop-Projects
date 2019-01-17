import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';

import { environment } from './../environments/environment';
import {
  LoginRequest, LoginResponse, RegistrationRequest, RegistrationResponse, UserSessionCheckResponse, IncomingMessage
} from './app-interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private BASE_URL = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  private socket;

  constructor(
    private http: HttpClient
  ) { }

  usernameAvailable(username: string) {
    return this.http.get(`${this.BASE_URL}usernameAvailable/${username}`, this.httpOptions).pipe(
      map(
        (response: LoginResponse) => {
          return response;
        },
        (error) => {
          throw error;
        }
      )
    );
  }

  registerUser(params: RegistrationRequest) {
    return this.http.post(`${this.BASE_URL}register`, JSON.stringify(params), this.httpOptions).pipe(
      map(
        (response: RegistrationResponse) => {
          return response;
        },
        (error) => {
          throw error;
        }
      )
    );
  }

  login(params: LoginRequest) {
    return this.http.post(`${this.BASE_URL}login`, JSON.stringify(params), this.httpOptions).pipe(
      map(
        (response: LoginResponse) => {
          return response;
        },
        (error) => {
          throw error;
        }
      )
    );
  }

  userSessionCheck(userId: string) {
    return this.http.get(`${this.BASE_URL}userSessionCheck/${userId}`, this.httpOptions).pipe(
      map(
        (response: UserSessionCheckResponse) => {
          return response;
        },
        (error) => {
          throw error;
        }
      )
    );
  }

  logout(userId: String) {
    return this.http.post(`${this.BASE_URL}logout`, JSON.stringify({
      userId: userId
    }), this.httpOptions).pipe(
      map(
        (response: RegistrationResponse) => {
          return response;
        },
        (error) => {
          throw error;
        }
      )
    );
  }

  connectSocket() {
    this.socket = io(this.BASE_URL);
  }

  sendMessage(message: string) {
    this.socket.emit('message', {
      message: message
    });
  }

  receiveMessages(): Observable<IncomingMessage> {
    return new Observable(observer => {
      this.socket.on('message-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
}
