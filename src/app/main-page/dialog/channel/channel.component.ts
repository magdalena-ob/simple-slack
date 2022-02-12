import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  channel = new Channel();

  constructor() { }

  ngOnInit(): void {
  }

}
