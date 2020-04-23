import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FireStoreService } from '../../../services/db/firestore.service';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  private chats: any
  private messages: Observable<any>;



  constructor(private alertController : AlertController, private store : FireStoreService, private auth : AuthService) { }

  ngOnInit() {
    this.chats = this.store.getChatIDs();
    
    // this.messages = this.store.getMessages();
  }


}
