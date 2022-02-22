import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  user: Observable<any> | null;
  allUsers: any = [];

  constructor(public dialog: MatDialog, public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user = null;
  }

  ngOnInit(): void {
    //this.afAuth.authState
     // .subscribe(user => {
     //   console.log('main-page: user ', user);
      
        //if (user) {
        //  let emailLower = user.email.toLowerCase();
        //  this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
        //}
      //});

      this.getUsers();

  }

  getUsers() {
    return this.firestore
      .collection('users')
      .valueChanges({idField: 'userID'})
      .subscribe((changes) => {
        this.allUsers = changes;
        for(let usr of this.allUsers) {
          console.log('user id is ', usr.userID);
        }
      }) 
  }

  openAddChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

  logout(): void {
    this.afAuth.signOut();
  }

}
