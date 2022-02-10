import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DialogSearchCahnnelComponent } from '../dialog-search-cahnnel/dialog-search-cahnnel.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  openAddChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

  openSearchChannel() {
    this.dialog.open(DialogSearchCahnnelComponent);
  }

}
