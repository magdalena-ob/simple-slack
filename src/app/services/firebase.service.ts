import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Channel } from 'src/models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  channel = new Channel(); //for saveChannel
  channelCreated : boolean = false;

  channels: Observable<any[]> | undefined; //for getAllChannels
  customIdChannel: any;


  //currentChannel: Observable<any> | undefined; //for getChannel
  //channelId: any = '';

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) { }

  //for creating a channel in dialog-add-channel.component
  saveChannel() {
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((result: any) => {
        console.log('finished adding channel', result);
        this.channelCreated = true;
        return this.channel;
      });
  }

  //to show all created channels in search-channel.component
  getAllChannels() {
    this.channels = this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdChannel' })
      return this.channels;
  }

  //getId() {
  //  this.route.paramMap.subscribe( paramMap => {
  //    this.channelId = paramMap.get('id');
  //    console.log('got channel id ', this.channelId);
  //    return this.channelId;
  //}

  //to show current channel in channel.component
  //getChannel() {
  //  this.currentChannel = this.firestore
  //    .collection('channels')
  //    .doc(this.channelId)
  //    .valueChanges()
  //    return this.currentChannel;
  //}

 
}
