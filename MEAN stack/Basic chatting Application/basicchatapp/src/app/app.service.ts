import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/** Importing socket io client */
import * as io from 'socket.io-client';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  socket: any =  null;
  constructor(private httpClient: HttpClient) { }

  singUp(params: {username: string}): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}/singup`, params);
  }

  connectSocket() {
    this.socket = io(environment.SOCKET_URL);
  }

  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  sendMessage(message: string) {
    this.socket.emit('message', {
      message: message
    });
  }
}
