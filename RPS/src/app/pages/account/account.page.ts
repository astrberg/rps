import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { Error } from '../../../services/db/model/error';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  private error: Error = {
    error_msg: '',
    success_msg: ''
  }
  
  private currentPassword: string = '';
  private newPassword: string = '';

  constructor(
    private alert : AlertController,
    private auth: AuthService) { }

  ngOnInit() {
  }

  async changePassword() {
    this.auth.changePassword(this.currentPassword, this.newPassword)
    .then((res) => {
      this.error.error_msg = '';
      this.error.success_msg = "Updated password!";
    })
    .catch((err) => {
      this.error.success_msg = '';
      this.error.error_msg = err.message;
    });

  }

  async deleteUser() {
    const alert = await this.alert.create({
      header: 'Delete the account',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Provide your password'
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
            this.auth.deleteUser(res.password);
          }
        }
      ]
    });

    await alert.present();
  }


}
