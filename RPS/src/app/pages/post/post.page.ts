import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireStoreService } from '../../../services/db/firestore.service';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Post } from '../../../services/db/model/post';
import { Error } from '../../../services/db/model/error';
import { Observable } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  fileSize: number;
  task: AngularFireUploadTask;
  fileRef: AngularFireStorageReference;
  uploadURL: Observable<string>;
  uploadState: string;
  docRef: string;
  
  post: Post = {
    created: null,
    uid: null,
    user: null,
    price: null,
    imgUrl: null,
    phone: null,
    location: null,
  };

  error: Error = {
    error_msg: '',
    success_msg: ''
  }

  constructor(
    private router: Router,
    private store: FireStoreService,
    private storage: AngularFireStorage,
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
      alert("Please provide a valid file type, either jpg or png");
      return;
    }
    const name = `${new Date().getTime()}_${file.name}`;
    this.fileRef = this.storage.ref(name);


    this.task = this.storage.upload(name, file);
    // this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.task.snapshotChanges().pipe(
      map((s => {
        // this.uploadState = s.state;
        console.log(s.state)
        this.fileSize = s.totalBytes;
      })),
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


}
