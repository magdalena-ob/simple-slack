import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direct-message-add',
  templateUrl: './direct-message-add.component.html',
  styleUrls: ['./direct-message-add.component.scss']
})
export class DirectMessageAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cardValue: any = {
    options: []
  };

  selectOptions: Array<string> = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
  ];

  selectChange = (event: any) => {
    const key: string = event.key;
    this.cardValue[key] = [ ...event.data ];

    console.log(this.cardValue);
  };

}
