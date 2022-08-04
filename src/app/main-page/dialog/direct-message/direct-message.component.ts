import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss']
})
export class DirectMessageComponent implements OnInit {

  chatID: any = '';
  chat: any;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getChatID();
    
  }

  getChatID() {
    this.route.paramMap.subscribe(paramMap => {
      this.chatID = paramMap.get('ID');
      this.loadPrivateChat();
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

}
