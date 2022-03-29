import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { FileService } from '../services/file.service';
import { MatButtonModule } from '@angular/material/button';

import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";


@Component({
  selector: 'app-dialog-upload-file',
  templateUrl: './dialog-upload-file.component.html',
  styleUrls: ['./dialog-upload-file.component.scss'],
  template: `
    <input type="file" (change)="uploadFile(event)" />
    <div>{{ uploadPercent | async }}</div>
    <a [href]="downloadURL" | async">{{ downloadURL | async }}</a>
    <img [src]="profileUrl | async" />
  `
})
export class DialogUploadFileComponent implements OnInit {
  [x: string]: any;

  uploadPercent!: Observable<number | undefined>;
  downloadURL: Observable<string> | undefined;
  file: any;


  storage: any = getStorage();
  metadata = {
    contentType: 'image/jpeg'
  };

  constructor() { }

  //old version
  //constructor(private storage: AngularFireStorage, private fileService: FileService ) { //angularfire storage
  // const ref = this.storage.ref('gs://simple-slack-af9e7.appspot.com'+'files0.200362540166646[object File].png');
  // this.profileUrl = ref.getDownloadURL();
  //} //firestore

  ngOnInit(): void {

  }

  showPreview(event: any, img: HTMLImageElement) {
    this.file = event.target.files[0];
    console.log('Selected filename: ', this.file);
    img.src= URL.createObjectURL(this.file);
  }

  uploadFile(event: any) {
    console.log(this.file);

    const storageRef = ref(this.storage, 'images/' + this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file, this.metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );



    //old version

    //const filePath = "/files"+Math.random()+this.file; // 'name-your-file-path-here'
    //const fileRef = this.storage.ref(filePath);
    //const task = this.firestore.upload(filePath, this.file);
    //const task = this.storage.upload("/files"+Math.random()+this.file, this.file);

    // observe percentage changes
    //this.uploadPercent = task.percentageChanges();
    // get ontified when the download URL i available
    //task.snapshotChanges().pipe(
    //  finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    //).subscribe()
  }





}
