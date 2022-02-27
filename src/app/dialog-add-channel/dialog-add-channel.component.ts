import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent implements OnInit {
  name = new FormControl('', [Validators.required])

  channel = this.firebaseService.channel;

  constructor(
    public dialogRef: MatDialogRef<DialogAddChannelComponent>, 
    private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.channel.category = '';     //to clear input
    this.channel.description = '';
  }

  async createChannel() {
   // try {
   //   let newChannelDoc = await this.firebaseService.addChannel()
   //   console.log('new Channel Doc ', newChannelDoc);
   //  
   // } catch (error) {
   //   console.error(error)
   // }
   
    this.firebaseService.getCurrentUser();
    this.dialogRef.close(); 

  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must give your channel a name!'
    }
    return this.name.hasError('name') ? 'Not a valid name' : '';
  }

}
