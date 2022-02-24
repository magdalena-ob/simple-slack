import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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

  constructor(public dialog: MatDialog, private firebaseService: FirebaseService, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.firebaseService.getAllChannels()
      .subscribe(channels => {
        this.allChannels = channels;
        console.log('search channel inof', this.allChannels);
      })

  }

  openAddChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

  joinChannel() {
    //console.log('you joined channel');
   console.log('your joined channel ', this.allChannels.customIdChannel);
    
  }

}


