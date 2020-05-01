import { Injectable, ɵReflectionCapabilities } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { Post } from "./model/post";
import { Message } from "./model/message";
import { Chat } from "./model/chat";
import { Image } from "./model/image"
import { AuthService } from '../auth.service';
import * as firebase from 'firebase'
import { sha256 } from 'crypto-js/sha256';

@Injectable()
export class FireStoreService {
       constructor(private afs: AngularFirestore, private auth: AuthService) {}


    addImage(image: Image) {
        return this.afs.collection<Image>(`users/${this.auth.getUID()}/images`).add(image);
    
    }

    getPosts() {
        return this.afs.collection<Post>('posts', ref => ref.orderBy('created', 'desc')).valueChanges({ idField: 'id' });
    }

    getFavorites() {
        return this.afs.collection<Post>(`users/${this.auth.getUID()}/favorites/`).valueChanges({ idField: 'id' });
    }

    addPost(post: Post) {
        return this.afs.collection<Post>('posts').add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            uid: this.auth.getUID(),
            user: this.auth.getUsername(),
            price: post.price,
            imgUrl: post.imgUrl,
            phone: post.phone,
            location: post.location
        });
    }


    addFavorite(post: Post, postId: string) {
        this.afs.collection(`users/${this.auth.getUID()}/favorites/`).doc(postId).get().subscribe(doc => {
            if (doc.exists) {
                alert("Post already exists in favorites!")
            } else {
                this.afs.collection(`users/${this.auth.getUID()}/favorites/`).doc(postId).set(post);

            }
        });

    }

    deleteFavorite(id: string) {
        return this.afs.collection(`users/${this.auth.getUID()}/favorites/`).doc(id).delete();

    }

    deletePost(id: string) {
        return this.afs.collection(`posts`, ref => ref.where('uid', '==', this.auth.getUID())).doc(id).delete();

    }

    isCreator(uid: string): boolean {
        return this.auth.getUID() === uid;
    }

    getChatIDs() {
        return this.afs.collection<any>('userChats').doc(this.auth.getUID()).collection('chats', ref =>
            ref.orderBy('created', 'desc')).valueChanges({ idField: 'id' });
    }

    getMessages(chatId: string): Observable<Message[]> {
        return this.afs.collection<Message>(`chats/${chatId}/messages`, ref => ref.orderBy('created', 'desc')).valueChanges();
    }

    createChat(message: string, receiverUID: string, receiverName: string) {
        const senderUID = this.auth.getUID();
        const senderName = this.auth.getUsername();
        const created = firebase.firestore.FieldValue.serverTimestamp();
        const chatID = this.getChatId(senderUID, receiverUID);

        this.afs.collection<Message>('chats').doc(chatID).collection('messages').add({
            sender: senderName,
            message: message,
            created: created,
        });

        this.afs.collection<Chat>('userChats').doc(senderUID).collection('chats').doc(chatID).set({
            sender: receiverName,
            lastMessage: message,
            created: created,

        });

        this.afs.collection<Chat>('userChats').doc(receiverUID).collection('chats').doc(chatID).set({
            sender: senderName,
            lastMessage: message,
            created: created,

        });
    }

    sendMessage(message: string, receiverUID: string) {
        const senderUID = this.auth.getUID();
        const senderName = this.auth.getUsername();
        const created = firebase.firestore.FieldValue.serverTimestamp();
        const chatID = this.getChatId(senderUID, receiverUID);


        this.afs.collection<Message>('chats').doc(chatID).collection('messages').add({
            sender: senderName,
            message: message,
            created: created,
        });

        this.afs.collection<Chat>('userChats').doc(senderUID).collection('chats').doc(chatID).update({
            lastMessage: message,
            created: created,

        });

        this.afs.collection<Chat>('userChats').doc(receiverUID).collection('chats').doc(chatID).update({
            lastMessage: message,
            created: created,

        });



    }

    private getChatId(user1: string, user2: string) {
        return user1 < user2 ? user1 + '_' + user2 : user2 + '_' + user1;
    }

}