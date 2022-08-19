import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss']
})
export class DirectMessageComponent implements OnInit {

  chatID: any = '';
  chat: any;
  chatMessages: any = [];
  //emailLower: any;
  anonymousGuest: boolean = false;
  user: Observable<any> | null;
  userID: any = '';

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth
  ) { 
    this.user = null;
  }

  ngOnInit(): void {
    this.getChatID();
    this.getUserId();
    
  }

  getChatID() {
    this.route.paramMap.subscribe(paramMap => {
      this.chatID = paramMap.get('ID');
      this.loadPrivateChat();
      this.getMessage();
    });
  }

  loadPrivateChat() {
    console.log('current chat id is ', this.chatID);
    this.firestore
      .collection('chats')
      .doc(this.chatID)
      .valueChanges()
      .subscribe((chat: any) => {
        this.chat = chat;
      });
  }

  getMessage() {
    this.firestore
      .collection('chats')
      .doc(this.chatID)
      .collection('messages')
      .valueChanges(({ idField: 'customIdMessage' }))
      .subscribe((changes: any) => {
        this.chatMessages = changes;
        //this.orderByTimeSent();
        console.log('retrieved chatmessages ', this.chatMessages);
      })
  }

  getUserId() {
    this.afAuth.authState
      .subscribe((user: any) => {
        console.log('main-page: user ', user);
        if (user.isAnonymous == true) {
          console.log('Gast is logged in');
          this.anonymousGuest = true;
        }
        if (user) {
          this.userID = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(this.userID).valueChanges();       
        }
      });
  }

}
