import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../services/db/model/user';
import { Error } from '../../../services/db/model/error';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {


  private user: User = {
    email: '',
    password: ''
  }
  
  private error: Error = {
    error_msg: '',
    success_msg: ''
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private alert: AlertController
    ) {

  }

  ngOnInit() {
    this.disclaimer();
  }

  async disclaimer() {
    const alert = await this.alert.create({
      header: 'Disclaimer and consent using this page',
      message: 'This is a DEMO! This is a university project, it is NOT for commercial use. You consent and agree in full with the app creator.',
      buttons: [
        {
          text: 'Take me back',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            window.history.back();
          }
        },
        {
          text: 'Accept',
          handler: () => {}
        }
      ]
    });

    await alert.present();
  }

  async resetPassword() {
    const alert = await this.alert.create({
      header: 'Reset Password',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Provide your email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Send',
          handler: res => {
            this.auth.resetPassword(res.email);
          }
        }
      ]
    });

    await alert.present();
  }

  login() {
    this.auth.login(this.user.email, this.user.password)
    .then((res) => {
      this.error.error_msg = '';
      this.error.success_msg = "Success! Logging in..."

      setTimeout(() => {
        this.error.success_msg = '';
        this.router.navigate(["/"]);
      }, 3000);

    })
    .catch((err) => {
      this.error.error_msg = err.message;

    });
  }

}