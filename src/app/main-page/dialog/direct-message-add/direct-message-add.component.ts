import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-direct-message-add',
  templateUrl: './direct-message-add.component.html',
  styleUrls: ['./direct-message-add.component.scss']
})
export class DirectMessageAddComponent implements OnInit {

  cardValue: any = {
    options: []
  };

   @Input() selectOptions: any[] = [];
   emails: any = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: unknown[]) => {
        console.log('received changes from database', changes);
        this.selectOptions = changes;
        this.emails = this.selectOptions.map((so: any) => so['email']) as string[];

        console.log('selectOptions', this.selectOptions);
        console.log('selectOptions.map', this.selectOptions.map((so: any) => so['email']) as string[]);
      });
  }

  getEmails() {
    let emails = this.selectOptions.map((so: any) => so['email']) as string[];
    return emails;
  }

  setselectOptions(changes: any) {
    for (let i = 0; i <= changes.length; i++) {
      this.selectOptions.push(changes[i]["email"]);
    }
  }

  selectChange = (event: any) => {
    const key: string = event.key;
    this.cardValue[key] = [...event.data];

    console.log(this.cardValue);
  };

}
