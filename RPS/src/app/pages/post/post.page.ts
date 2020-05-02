import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FireStoreService } from '../../../services/db/firestore.service';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Post } from '../../../services/db/model/post';
import { Error } from '../../../services/db/model/error';
import { Observable } from 'rxjs';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { finalize, tap, map } from 'rxjs/operators';
import { DocumentReference } from '@angular/fire/firestore/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  private fileSize: number;
  private task: AngularFireUploadTask;
  private fileRef: AngularFireStorageReference;
  private uploadURL: Observable<string>;
  private docRef: string;


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
    private storage: AngularFireStorage,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
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
  uploadImage(event: FileList) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      alert("Please provide a valid file type");
      return;
    }
    const name = `${new Date().getTime()}_${file.name}`;
    this.fileRef = this.storage.ref(name);


    this.task = this.storage.upload(name, file);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.uploadURL = this.fileRef.getDownloadURL();
        this.uploadURL.subscribe(res => {
          this.post.imgUrl = res; 
          this.store.addImage({ name: file.name, filepath: res, size: this.fileSize }).then(ref => {
            this.docRef = ref.id;
          },
            (err) => {
              alert("Failed to upload image to document store");
              console.error(err);
              this.removeImage();
            })
        })
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })
    )
      .subscribe()
  }
  removeImage() {
    return this.fileRef.delete().subscribe(() => {
      this.store.removeImage(this.docRef).catch((err) => console.error("Failed to delete image from document store", err))
      this.uploadURL = null;
      this.docRef = null;
    },
      (err) => console.error("Failed to delete image from storage", err));
  }
  // uploadImage(event) {
  // const actionSheet = await this.actionSheetController.create({
  //   header: "Select Image source",
  //   buttons: [{
  //           text: 'Load from Library',
  //           handler: () => {
  //               this.camera.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  //           }
  //       },
  //       {
  //           text: 'Use Camera',
  //           handler: () => {
  //               this.camera.getPicture(this.camera.PictureSourceType.CAMERA);
  //           }
  //       },
  //       {
  //           text: 'Cancel',
  //           role: 'cancel'
  //       }
  //   ]
  // });
  // await actionSheet.present();
  // }

  async takeImg() {
    const alert = await this.alertController.create({
      message: 'Access phone API and take image',
      buttons: ['Ok']
    });

    await alert.present();
  }


}
