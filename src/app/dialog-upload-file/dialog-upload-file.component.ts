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
 // profileUrl: Observable<string | null>;
 
  constructor(private storage: AngularFireStorage, private fileService: FileService ) { //angularfire storage
      // const ref = this.storage.ref('gs://simple-slack-af9e7.appspot.com'+'files0.200362540166646[object File].png');
      // this.profileUrl = ref.getDownloadURL();
  } //firestore

  ngOnInit(): void {
    
  }

  showPreview($event: any) {
    this.file = $event.target.files[0];
  }

  uploadFile($event: any) {
    console.log(this.file); 
    //this.file = $event.target.files[0];
    const filePath = "/files"+Math.random()+this.file; // 'name-your-file-path-here'
    const fileRef = this.storage.ref(filePath);
    //const task = this.firestore.upload(filePath, this.file);
    const task = this.storage.upload("/files"+Math.random()+this.file, this.file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get ontified when the download URL i available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    ).subscribe()
  }

  //view() {
  //  this.fileService.getImage(this.file);
  //}
  
}
