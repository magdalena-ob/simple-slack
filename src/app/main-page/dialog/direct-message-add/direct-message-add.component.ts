import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Chat } from 'src/models/chat.class';


@Component({
  selector: 'app-direct-message-add',
  templateUrl: './direct-message-add.component.html',
  styleUrls: ['./direct-message-add.component.scss']
})
export class DirectMessageAddComponent implements OnInit {

  cardValue: any = {
    options: []
  };

  chat: Chat = new Chat();
  userID: any = '';
  chatID: any = '';

  @Input() selectOptions: any[] = [];
  emails: any = [];

  constructor(
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: unknown[]) => {
        console.log('received changes from database', changes);
        this.selectOptions = changes;
        this.emails = this.selectOptions.map((so: any) => so['email']) as string[];

        console.log('selectOptions', this.selectOptions);
        console.log('selectOptions.map', this.selectOptions.map((so: any) => so['email']) as string[]);
      });

    this.getCurrentUser();
  }

  getEmails() {
    let emails = this.selectOptions.map((so: any) => so['email']) as string[];
    return emails;
  }

  setselectOptions(changes: any) {
    for (let i = 0; i <= changes.length; i++) {
      this.selectOptions.push(changes[i]["email"]);
    }
  }

  selectChange = (event: any) => {
    const key: string = event.key;
    this.cardValue[key] = [...event.data];

    console.log(this.cardValue);
  };

  getCurrentUser() {
    this.afAuth.authState
      .subscribe((user: any) => {
        console.log('email user ', user.email);

        if (user) {
          this.userID = user.email.toLowerCase();
          console.log('current user is', this.userID);
        }
      });
  }

 async createChat() {
    //let user1 = this.userID.slice(0,3);
    //let user2 = this.cardValue['options'][0].slice(0,3)
    //this.chatID = user1 + user2;
    this.chatID = this.userID + '+' + this.cardValue['options'][0];

    this.firestore
      .doc('/chats/' + this.chatID)
      .set(
        {
          fromID: this.userID,
          toID: this.cardValue['options'][0]
        }
      );
    console.log('emails', this.emails);
    console.log('selected options', this.selectOptions);
    console.log('cardvalue', this.cardValue['options'][0]);
    console.log('chat id is ', this.chatID);

    
  }

 async openChat() {
    await this.createChat();
    this.router.navigate(['/main-page/directmessage/' + this.chatID]);
  }



}
