import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';

@Component({
  selector: 'app-search-channel',
  templateUrl: './search-channel.component.html',
  styleUrls: ['./search-channel.component.scss']
})

export class SearchChannelComponent implements OnInit {

  allChannels :any = [];
  searchText: any;
  value = '';

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({idField: 'customIdChannel'})
      .subscribe((changes: any) => {
        console.log('received changes from database', changes);
        this.allChannels = changes;
        console.log('show arry allChannels', this.allChannels);
      })
  }

  openAddChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

}
