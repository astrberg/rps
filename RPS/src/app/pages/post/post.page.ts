import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FireStoreService } from '../../../services/db/firestore.service';
import { Post } from '../../../services/db/model/post';
import { Error } from '../../../services/db/model/error';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  private post: Post = {
    created: null,
    uid: null,
    user: null,
    price: null,
    imgUrl: null,
    phone: null,
    location: null,
  };

  private error: Error = {
    error_msg: '',
    success_msg: ''
  }

  constructor(
    private alertController: AlertController,
    private router: Router,
    private store: FireStoreService,
    ) { }

  ngOnInit() {
  }

  addPost() {
    this.store.addPost(this.post)
    .then((res) => {
      this.error.error_msg = '';
      this.error.success_msg = "Success! Posting..."

      setTimeout(() => {
        this.error.success_msg = '';
        this.router.navigate(['']);
      }, 3000);

    })
    .catch((err) => {
      console.log(err);
      this.error.error_msg = err.message;

    });
  }

  async uploadImage() {
    const alert = await this.alertController.create({
      message: 'Upload image',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async takeImg() {
    const alert = await this.alertController.create({
      message: 'Access phone API and take image',
      buttons: ['Ok']
    });

    await alert.present();
  }

  
}
