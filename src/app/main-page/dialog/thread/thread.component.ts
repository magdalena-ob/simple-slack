import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/models/message.class';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  channelId: any = ''
  threadId: any = '';
  threadMessages: any = [];
  message: Message = new Message();

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.channelId = params.get('id1')
      this.threadId = params.get('id2');
      console.log('got thread id ', this.threadId);
      this.getThread();
    })
  }

  getThread() {
    this.firestore
      //.collection('channels')
      //.doc(this.channelId)
      .collection('messages')
      .doc(this.threadId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.message = new Message(changes);
        console.log('retrieved threadmessage ', this.message);
      })
  }

}
