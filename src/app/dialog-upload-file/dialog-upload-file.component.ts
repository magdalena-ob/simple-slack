import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-dialog-upload-file',
  templateUrl: './dialog-upload-file.component.html',
  styleUrls: ['./dialog-upload-file.component.scss']
})
export class DialogUploadFileComponent implements OnInit {

  constructor(private firestore:AngularFireStorage) {
    
  }

  path!: String;

  ngOnInit(): void {
  }

  upload($event: any) {
    this.path = $event.target.files[0];
  }

  uploadImage() {
    console.log(this.path);
    this.firestore.upload("/files"+Math.random()+this.path, this.path);
  }

}
