import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';

@Component({
  selector: 'app-search-channel',
  templateUrl: './search-channel.component.html',
  styleUrls: ['./search-channel.component.scss']
})
export class SearchChannelComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

}
