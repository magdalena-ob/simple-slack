import { Component, OnInit } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { FirebaseService } from '../services/firebase.service';

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

  constructor(public dialog: MatDialog, private firebaseService: FirebaseService) { }


  ngOnInit(): void {

    this.firebaseService.getAllChannels()
      .subscribe(channels => {
        this.allChannels = channels})

    //this.firestore
    //  .collection('channels')
    //  .valueChanges({idField: 'customIdChannel'})
    //  .subscribe((changes: any) => {
    //    console.log('received changes from database', changes);
    //    this.allChannels = changes;
    //    console.log('show arry allChannels', this.allChannels);
    //  })
  }

  openAddChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

  joinChannel() {
    console.log('you joined channel');
  }

}


