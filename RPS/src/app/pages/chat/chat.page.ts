import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../../../services/db/firestore.service';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { Message } from "../../../services/db/model/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  private messages: Observable<Message[]>;
  private chatID: string;
  private message: string;

  constructor(
    private store : FireStoreService, 
    private route: ActivatedRoute,
    private auth : AuthService,
    ) { }

  ngOnInit() {
    this.chatID = this.route.snapshot.paramMap.get('id');
    this.messages = this.store.getMessages(this.chatID);

  }
  
  reply() {
    const receiverUID = this.chatID.split('_').filter(e => e !== this.auth.getUID())[0];
    this.store.sendMessage(this.message, receiverUID);
    this.message = '';
  }


}
