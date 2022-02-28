import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-search-channel',
  templateUrl: './search-channel.component.html',
  styleUrls: ['./search-channel.component.scss']
})

export class SearchChannelComponent implements OnInit {

  allChannels: any = [];
  customIdChannel = this.firebaseService.customIdChannel;
  searchText: any;
  value = '';

  user: Observable<any> | null;

  userID: any;

  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth) { this.user = null; }


  ngOnInit(): void {
    this.getCurrentUser();

    this.getAllChannels();
  }

  getCurrentUser() {
    this.afAuth.authState
      .subscribe((user: any) => {
        console.log('current user id is ', user.email);

        if (user) {
          return this.userID = user.email.toLowerCase();
        }
      });
  }

  getAllChannels() {
    this.firebaseService.getAllChannels()
      .subscribe(channels => {
        this.allChannels = channels;
        console.log('search channel info', this.allChannels);
      })

  }

  openAddChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

  joinChannel() {
    //console.log('you joined channel');
  }

}


