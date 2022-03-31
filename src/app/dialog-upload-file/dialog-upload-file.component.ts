import { Component, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { MatDialogRef } from '@angular/material/dialog';


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
  file: any;
  storage: any = getStorage();
  metadata = {
    contentType: 'image/jpeg'
  };

  constructor(public dialogRef: MatDialogRef<DialogUploadFileComponent>) { }

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
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.dialogRef.close(downloadURL); 
        });
      }
    );

  }

}
