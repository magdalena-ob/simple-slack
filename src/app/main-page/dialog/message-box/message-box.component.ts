import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadFileComponent } from 'src/app/dialog-upload-file/dialog-upload-file.component';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/models/message.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  toggle = true;
  status = 'Enable';

  channelId : any;
  message = new Message();
  timeSent: Date = new Date();

  user: Observable<any> | null;
  uid: any;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private firestore: AngularFirestore, public afAuth: AngularFireAuth) {
    this.user = null;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.channelId = paramMap.get('id1');
      console.log('got channel id ', this.channelId);

      this.getCurrentUserId();
      
    })
  }

  openDialog() {
    this.dialog.open(DialogUploadFileComponent);
  }

  getCurrentUserId() {
   // let currentUser = this.afAuth.user.subscribe();
    //console.log('message-box uid ', currentUser);

    this.afAuth.authState
      .subscribe((user: any) => {
        
        if (user) {
          this.uid = user.uid;
        }
      });
  }


  toSendMessage() {
    this.message.timeSent = this.timeSent.getTime();
    this.message.from = this.uid;                     //to get uid from user who sent the message
                                
    this.firestore
    .collection('channels')
    .doc(this.channelId)
    .collection('messages')
    .add(this.message.toJSON())
    .then((result:any) =>{
      console.log('finished adding message' , result);
    });
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }

}
