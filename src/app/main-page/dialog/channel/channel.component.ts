import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  channelId: any = '';
  channel: Channel = new Channel();
  channelmessages: any = [];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.channelId = paramMap.get('id');
      console.log('got channel id ', this.channelId);
      this.getChannel();
      this.getMessage();
    })
  }

  //getChannel() {
  //  this.firebaseService.getAllChannels()
  //    .doc(this.channelId)
  //}

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

  getMessage() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('messages')
      .valueChanges(({idField: 'customIdMessage'}))
      .subscribe((changes: any) => {
        this.channelmessages = changes;
        console.log('retrieved channelmessages ', this.channelmessages);
      })
  }

}
