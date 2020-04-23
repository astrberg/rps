import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class NotificationService {
    
    constructor(private afMessaging : AngularFireMessaging) {}

    // requestPermission() {
    //     this.afMessaging.requestToken.subscribe(
    //         (token) => { console.log('Permission granted! Save to the server!', token); },
    //         (error) => { console.error('Unable to get permission to notify. ', error); },  
    //       );
    //   }
    requestPermission() {
      this.afMessaging.requestToken
        .subscribe(
          (token) => { console.log('Permission granted!', token); },
          (error) => { console.error(error); },  
        );
    }
  
      deleteToken() {
        this.afMessaging.getToken
          .pipe(mergeMap(token => this.afMessaging.deleteToken(token)))
          .subscribe(
            (token) => { console.log('Token deleted!'); },
          );
      }

      listen() {
        this.afMessaging.messages.subscribe(
            (message) => { 
                console.log(message); 

            });
      }
}