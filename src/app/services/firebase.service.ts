import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  channel = new Channel();

  constructor(private firestore:AngularFirestore) { }

  saveChannel() {
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((result:any) =>{
        console.log('finished adding channel' , result);
        return this.channel;
      });
  }
}
