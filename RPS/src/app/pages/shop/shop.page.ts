import { Component, OnInit  } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FireStoreService } from '../../../services/db/firestore.service';
import { AuthService } from '../../../services/auth.service';
import {Post} from "../../../services/db/model/post";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.page.html',
  styleUrls: ['shop.page.scss']
})
export class ShopPage implements OnInit {

  private posts: Observable<Post[]>;

  constructor(
    private alertController: AlertController,
    private store: FireStoreService,
    private auth: AuthService,
    ) {}

  ngOnInit() {
    this.posts = this.store.getPosts();
  }
  
  isCreator(uid: string) : boolean {
    return this.auth.getUID() === uid;
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

  addFavorite(post: Post, id: string) {
    this.store.addFavorite(post, id);
  }

  deletePost(id: string) {
    this.store.deletePost(id)
    .catch((err) => {
      console.log(err);
      alert("Something went wrong");
    });
  }
  
}
