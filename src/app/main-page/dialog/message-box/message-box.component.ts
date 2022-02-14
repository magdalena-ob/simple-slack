import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadFileComponent } from 'src/app/dialog-upload-file/dialog-upload-file.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from 'src/models/message.class';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  toggle = true;
  status = 'Enable';

<<<<<<< HEAD
  constructor(public dialog: MatDialog, private firestore:AngularFirestore) { }
=======
  channelId : any;
  message = new Message();

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private firestore: AngularFirestore) { }
>>>>>>> 963af03eb482bf1473592a7f9524e13f17754a84

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.channelId = paramMap.get('id');
      console.log('got channel id ', this.channelId);
      this.toSendMessage();
    })
  }

  openDialog() {
    this.dialog.open(DialogUploadFileComponent);
  }

<<<<<<< HEAD
  toSaveAndSendMessage() {
    console.log('gesendet');
    this.firestore
      .collection('channels')
      .add(this.channel.toJSON())
      .then((result:any) =>{
        console.log('finished adding channel' , result);
      });
=======
  toSendMessage() {
    this.firestore
    .collection('channels')
    .doc(this.channelId)
    .collection('messages')
    .add(this.message.toJSON())
    .then((result:any) =>{
      console.log('finished adding message' , result);
    });
>>>>>>> 963af03eb482bf1473592a7f9524e13f17754a84
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }

}
