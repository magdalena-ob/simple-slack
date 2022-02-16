import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dialog-upload-file',
  templateUrl: './dialog-upload-file.component.html',
  styleUrls: ['./dialog-upload-file.component.scss'],
  template: `
    <input type="file" (change)="uploadFile(§event)" />
    <div>{{ uploadPercent | async }}</div>
    <a [href]="downloadURL" | async">{{ downloadURL | async }}</a>
  ` 
})
export class DialogUploadFileComponent implements OnInit {
  [x: string]: any;

  uploadPercent!: Observable<number>;
  downloadURL!: Observable<string>;
 
  constructor(private storage: AngularFireStorage) {
  } //firestore

  ngOnInit(): void {
    
  }

  showPreview($event: any) {
    this.selectedImage = $event.target.files[0];
  }

  uploadFile($event: any) {
    console.log(this.selectedImage); 
    const file = $event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get ontified when the download URL i available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    ).subscribe()
    //this.storage.upload("/files"+Math.random()+this.selectedImage, this.selectedImage)
  }
  
}
