import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { Channel } from 'src/models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  channel = new Channel(); //for saveChannel
  channelCreated: boolean = false;

  channels: Observable<any[]> | undefined; //for getAllChannels
  customIdChannel: any;

  user: Observable<any> | null;
  //emailLower: Observable<any> | undefined;
  //addedChannel: boolean = false;
  channelId: any;

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, public afAuth: AngularFireAuth,) {
    this.user = null;
  }

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

  //user who is logged in 
  getCurrentUser() {
    this.afAuth.authState
      .subscribe((user: any) => {
        console.log('main-page: user ', user);

        if (user) {
          let emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
          console.log('join channel', this.user);
        }
      });
  }

  //to add channel id to in channel array logged in user collection
  joinChannel() {
    this.afAuth.authState
      .subscribe((user: any) => {
        console.log('main-page: user ', user);

        if (user) {
          let emailLower = user.email.toLowerCase();
          return this.firestore
            .collection('users')
            .doc(emailLower)
            //.update({
            //  channels: firebase.firestore.FieldValue.arrayUnion('angular')
            //});
            .set(
              { channels: [this.channelId] },
              { merge: true }
            )
        }
      });
  }

}
