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
  addedChannels: any = [];

  constructor(public dialog: MatDialog, 
    public afAuth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService) {
      this.user = null;
  }

  ngOnInit(): void {
    this.afAuth.authState
      .subscribe((user: any) => {
        console.log('main-page: user ', user);

        if (user) {
          this.emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(this.emailLower).valueChanges();
          let userId = this.emailLower;

          this.getUsersChannel(userId);
        }
      });
      
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

  getUsersChannel(userId: any) {
    this.firestore
    .collection('users')
    .doc(userId)
    .collection('addedChannels')
    .valueChanges(({ idField: 'userChannelsID' }))
    .subscribe((result: any) => {
      this.addedChannels = result;
        console.log('added user channels: ', this.addedChannels);
      });
  }

}



