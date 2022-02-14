import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-direct-message-add',
  templateUrl: './direct-message-add.component.html',
  styleUrls: ['./direct-message-add.component.scss']
})
export class DirectMessageAddComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('received changes from database', changes);
        this.selectOptions = changes;
      
        console.log('selectOptions', this.selectOptions);
       
       
      });
      
  }

  setselectOptions(changes: any) {
 for (let i=0; i <= changes.length; i++ ){
   this.selectOptions.push(changes[i]["email"]);
 }
  }

  cardValue: any = {
    options: []
  };

  testarray2 = ["zwischentest", "b", "3"];
  testarray = [];
  @Input() selectOptions: any = ["1"
  
  ];

  selectChange = (event: any) => {
    const key: string = event.key;
    this.cardValue[key] = [ ...event.data ];

    console.log(this.cardValue);
  };

}
