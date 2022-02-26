import { AfterViewInit, Component, OnInit, AfterViewChecked, OnDestroy, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Channel } from 'src/models/channel.class';
import { SyntaxHighlightingService } from '../../../services/syntax-highlighting.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

  channelId: any = '';
  channel: Channel = new Channel();
  channelMessages: any = [];
  time: any = new Date().getHours();

  

 
  @ViewChild('textArea', { static: true })
  textArea!: ElementRef;
  @ViewChild('codeContent', { static: true })
  codeContent!: ElementRef;
  @ViewChild('pre', { static: true })
  pre!: ElementRef;

  sub!: Subscription;
  highlighted = false;
  codeType = 'javascript';


  form = this.fb.group({
    content: ''
  });

  get contentControl() {
    return this.form.get('content');
  }

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService,
    private prismService: SyntaxHighlightingService,
    private fb: FormBuilder,
    private renderer: Renderer2 
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.channelId = paramMap.get('id1');
      console.log('got channel id ', this.channelId);
      this.getChannel();
      this.getMessage();
      this.listenForm()
      this.synchronizeScroll();
    })
  }


  getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
        console.log('retrieved channel ', this.channel);
      })
  }

  getMessage() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('messages')
      .valueChanges(({idField: 'customIdMessage'}))
      .subscribe((changes: any) => {
        this.channelMessages = changes;
        console.log('retrieved channelmessages ', this.channelMessages);
      })
  }

  //joinChannel() {
  //  this.firebaseService.channelId = this.channelId;

  //  this.firebaseService.joinChannel();
  //}

  ngAfterViewInit() {
    this.prismService.highlightAll();
  }

  ngAfterViewChecked() {
    if (this.highlighted) {
      this.prismService.highlightAll();
      this.highlighted = false;
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private listenForm() {
    this.sub = this.form.valueChanges.subscribe((val) => {
      const modifiedContent = this.prismService.convertHtmlIntoString(val.content);

      this.renderer.setProperty(this.codeContent.nativeElement, 'innerHTML', modifiedContent);

      this.highlighted = true;
    });
  }

  private synchronizeScroll() {
    const localSub  = fromEvent(this.textArea.nativeElement, 'scroll').subscribe(() => {
      const toTop = this.textArea.nativeElement.scrollTop;
      const toLeft = this.textArea.nativeElement.scrollLeft;

      this.renderer.setProperty(this.pre.nativeElement, 'scrollTop', toTop);
      this.renderer.setProperty(this.pre.nativeElement, 'scrollLeft', toLeft + 0.2);
    });

    this.sub.add(localSub);
  }

}
