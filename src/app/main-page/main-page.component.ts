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

  constructor(public dialog: MatDialog, public afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }
  
  openAddChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

  logout():void {
    this.afAuth.signOut();
  }

}
