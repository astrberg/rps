import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FireStoreService } from '../../../services/db/firestore.service';
import {Post} from "../../../services/db/model/post";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  private favorites: Observable<Post[]>;

  constructor(private alertController : AlertController, private store : FireStoreService) { }

  ngOnInit() {
    this.favorites = this.store.getFavorites();
  }

  async selectUser() {
    const alert = await this.alertController.create({
      message: 'Show info here about the user, like location and (rating)',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async buy(postUID: string, postName: string) {
    const alert = await this.alertController.create({
      header: 'Contact the seller now!',
      inputs: [
        {
          name: 'message',
          type: 'text',
          placeholder: 'Hey! I want to buy that phone today.'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log("User cancel");
          }
        }, {
          text: 'Send',
          handler: res => {
            this.store.createChat(res.message, postUID, postName);
          }
        } 
      ]
    });

    await alert.present();
  }

  deleteFavorite(id: string) {
    this.store.deleteFavorite(id)
    .catch((err) => {
      console.log(err);
      alert("Something went wrong!");
    });
  }
}
