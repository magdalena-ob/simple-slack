import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
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
  channelId: any;

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, public afAuth: AngularFireAuth,) {
    this.user = null;

  }

  //for creating a channel in dialog-add-channel.component

  //async addChannel() {
  //  return await this.firestore
  //    .collection('channels')
  //    .add(this.channel.toJSON())
  //}

  async addChannel(userID: string | undefined) {
    try {
      let newChannelDoc = await this.firestore
        .collection('channels')
        .add(this.channel.toJSON())

        console.log('new Channel Doc', newChannelDoc);

      //this.firestore.collection('users').doc(userID).set(           //array in user collection
      //  { channels: [newChannelDoc.id] },
      //  { merge: true }
      //);

      this.firestore                                                  //subcollection in user collection
        .collection('users')
        .doc(userID)
        .collection('addedChannels')
        .add(
          { channels: newChannelDoc.id }
        );
    } catch (error) {
      console.error(error);
    }
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
        console.log('email user ', user.email);

        if (user) {
          let userID = user.email.toLowerCase();
          //this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
          console.log('current user is', userID);
          this.addChannel(userID);
        }
      });
  }




  //to add channel id to in channel array logged in user collection
  // joinChannel() {
  //   this.afAuth.authState
  //     .subscribe((user: any) => {
  //       console.log('main-page: user ', user);

  //      if (user) {
  //        let emailLower = user.email.toLowerCase();
  //        return this.firestore
  //          .collection('users')
  //          .doc(emailLower)
  //          .set(
  //            { channels: [this.channelId] },
  //            { merge: true }
  //          )
  //      }
  //    });
  //}

}

