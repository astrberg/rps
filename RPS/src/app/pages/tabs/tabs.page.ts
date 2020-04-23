import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private alert: AlertController, private notification: NotificationService, private auth: AuthService) {}

  ngOnInit() {
    // this.notification.requestPermission();
    // this.notification.listen();
  }

  async logout() {
    const alert = await this.alert.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Logout',
          handler: res => {
            this.auth.logout();
          }
        }
      ]
    });

    await alert.present();
  }

}