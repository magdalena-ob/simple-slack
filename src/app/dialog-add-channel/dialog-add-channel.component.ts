import { Component, OnInit } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
//import { Channel } from 'src/models/channel.class';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {

  //channel = new Channel();
  channel = this.firebaseService.channel;

  constructor( private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  createChannel() {
    this.firebaseService.saveChannel();
    console.log('show added channels', this.channel)
  }

  //saveChannel() {
  //  this.firestore
  //    .collection('channels')
  //    .add(this.channel.toJSON())
  //    .then((result:any) =>{
  //      console.log('finished adding channel' , result);
  //    });
  //}

}
