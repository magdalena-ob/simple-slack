import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Channel } from 'src/models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  channel = new Channel(); //for saveChannel

  channels: Observable<any[]> | undefined; //for getAllChannels
  customIdChannel: any;

  constructor(private firestore: AngularFirestore) { }

  //for creating a channel in dialog-add-channel.component
  saveChannel() {
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((result: any) => {
        console.log('finished adding channel', result);
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

 
}
