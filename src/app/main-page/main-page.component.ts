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
  emailLower: any;

  constructor(public dialog: MatDialog, public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user = null;
  }

  ngOnInit(): void {
    this.afAuth.authState
      .subscribe((user: any) => {
        console.log('main-page: user ', user);

        if (user) {
          this.emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(this.emailLower).valueChanges();
        }
      });
  }

  openAddChannel() {
   let dialogRef = this.dialog.open(DialogAddChannelComponent);
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
    dialogRef.afterClosed().subscribe((result: any)=> {
      console.log('result is',  result);
    })
  }

  logout(): void {
    this.afAuth.signOut();
  }

}
