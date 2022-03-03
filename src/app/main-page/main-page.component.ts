import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  user: Observable<any> | null;
  emailLower: any;
  allChannels: any = [];
  customIdChannel = this.firebaseService.customIdChannel;
  addedChannels: any = [];
  addedChannelNames: any = [];
  addedChannelIds: any = [];
  anonymousGuest: boolean = false;

  constructor(public dialog: MatDialog,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService) {
    this.user = null;
  }

  ngOnInit(): void {
    this.getAllChannels();

    this.afAuth.authState
      .subscribe((user: any) => {
        console.log('main-page: user ', user);
        if(user.isAnonymous == true) {
          console.log ('Gast is logged in');
          this.anonymousGuest = true;
        }
        if (user) {
          this.emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(this.emailLower).valueChanges();
          let userId = this.emailLower;

          this.getUsersChannel(userId);
        } 
      });

      console.log('addedChannelNames', this.addedChannelNames);
  }

  openAddChannel() {
    this.dialog.open(DialogAddChannelComponent);

    //this.dialog.afterAllClosed.subscribe(
    //  {
    //    next: (newChannelDoc: any) => {
    //      console.log(newChannelDoc);
    //      this.firestore
    //        .collection('users')
    //        .doc(this.emailLower)
    //        .set({channels: [newChannelDoc.id]},
    //        { merge: true });
    //    },
    //    error: (error: any) => {console.error(error)},
    //    complete: () => {}

    //  }
    //)
  }

  logout(): void {
    this.afAuth.signOut();
  }

  getAllChannels() {
    this.firebaseService.getAllChannels()
    .subscribe(channels => {
      this.allChannels = channels;
      console.log('all channels', this.allChannels);
    })
  }
 

  getUsersChannel(userId: any) {
    this.firestore
      .collection('users')
      .doc(userId)
      .collection('addedChannels')
      .valueChanges(({ idField: 'userChannelsID' }))
      .subscribe((result: any) => {
        this.addedChannels = result;
        console.log('added user channels: ', this.addedChannels);
       
        this.getChannelName()
      });
  }

  getChannelName() {
    for (let all in this.allChannels) {
      let allChannelsId = this.allChannels[all].customIdChannel;
      let channelName = this.allChannels[all].category;
      //console.log('allChannelsId is ', allChannelsId);

      for (let added in this.addedChannels) {
        let id = this.addedChannels[added].channels;
        //console.log('channel id is', id);

        if (allChannelsId == id) {
          this.addedChannelNames.push(channelName);
          this.addedChannelIds.push(id);
        }
      } 
    }
  }

}



