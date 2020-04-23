import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  
  private username = "";

  constructor(
    private alertController: AlertController,
    private auth: AuthService) {
  
    }

  ngOnInit() {    
    this.username = this.auth.getUsername();
  }

  async updateProfileImg() {
    const alert = await this.alertController.create({
      message: 'Update or change the profile img of the user',
      buttons: ['Ok']
    });

    await alert.present();
  }
 
  async favorites() {
    const alert = await this.alertController.create({
      message: 'Redirect to favorite page, change Profile page/icon to favorite page/icon',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async account() {
    const alert = await this.alertController.create({
      message: 'Redirect to account page, change Profile page/icon to account page/icon',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async about() {
    const alert = await this.alertController.create({
      message: 'Redirect to about page, change Profile page/icon to about page/icon',
      buttons: ['Ok']
    });

    await alert.present();
  }




}
