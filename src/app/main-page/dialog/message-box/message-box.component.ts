import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadFileComponent } from 'src/app/dialog-upload-file/dialog-upload-file.component';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  toggle = true;
  status = 'Enable';

  constructor(public dialog: MatDialog, private firestore:AngularFirestore) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogUploadFileComponent);
  }

  toSaveAndSendMessage() {
    console.log('gesendet');
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((result:any) =>{
        console.log('finished adding channel' , result);
      });
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }

}
