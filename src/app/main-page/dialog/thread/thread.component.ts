import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { Message } from 'src/models/message.class';
import { orderBy, query, serverTimestamp } from 'firebase/firestore';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})


export class ThreadComponent implements OnInit {

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  channel: Channel = new Channel();
  channelId: any = ''
  threadId: any = '';
  threadMessages: any = [];
  message: Message = new Message();
  allComments: any = [];

  ngOnInit(): void {
     this.route.params.subscribe((params) => {
      console.log('whole param', params);
      this.channelId = params.id1;
      this.threadId = params.id2;
      console.log('got channel id ', this.channelId);
      console.log('got thread id ', this.threadId);
      this.getThread();
      this.getChannel();
      this.getComments();
    })
  
  }

  getThread() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('messages')
      .doc(this.threadId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.message = new Message(changes);
        console.log('retrieved threadmessage ', this.message);
      })
  }

  getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
        console.log('retrieved channel ', this.channel);
      })
  }

  getComments() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('messages')
      .doc(this.threadId)
      .collection('comments')
      //.orderBy('timeSent')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allComments = changes;
        console.log('comments', this.allComments);
        this.orderByTimeSent();
        
      })
  }

  orderByTimeSent() {
    return this.allComments.sort(
      (objA: { timeSent: number; }, objB: { timeSent: number; }) => objA.timeSent - objB.timeSent,
    );
  }
  

}
