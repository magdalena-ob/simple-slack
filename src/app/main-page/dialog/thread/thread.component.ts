import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

threadId: any='';
threadmessages:any = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.threadId = paramMap.get('id');
      console.log('got channel id ', this.threadId);
      this.getthread();
    })
  }

  getthread() {
    this.firestore
      .collection('messages')
      .doc(this.threadId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.threadmessages = changes;
        console.log('retrieved threadmessages ', this.threadmessages);
      })
  }

}
