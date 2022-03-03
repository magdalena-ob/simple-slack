import { AfterViewInit, Component, OnInit, AfterViewChecked, OnDestroy, ElementRef, Renderer2, ViewChild, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  userID: any = '';
  members: any = [];
  isMember: boolean = false;
  allChannelMembers: any  = [];

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
    public afAuth: AngularFireAuth,
    private prismService: SyntaxHighlightingService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id1');
      console.log('got channel id ', this.channelId);
      this.getUser();
      this.getChannel();
      this.getMessage();
      this.listenForm()
      this.synchronizeScroll();
      this.getMembers();
      //this.checkForMember();
      
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
      .valueChanges(({ idField: 'customIdMessage' }))
      .subscribe((changes: any) => {
        this.channelMessages = changes;
        console.log('retrieved channelmessages ', this.channelMessages);
      })
  }

  joinChannel() {
    this.firestore
      .collection('users')
      .doc(this.userID)
      .collection('addedChannels')
      .add(
        { channels: this.channelId }
      );

      this.firestore
        .collection('channels')
        .doc(this.channelId)
        .collection('members')
        .add(
           {
             memberID: this.userID,
             joined: true
           }
        );
  }

  getUser() {
    this.afAuth.authState
      .subscribe((user: any) => {

        if (user) {
          this.userID = user.email.toLowerCase();
          console.log('UserID is', this.userID);
        }
      });
  }

  getMembers() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('members')
      .valueChanges(({ idField: 'customIdMember' }))
      .subscribe((changes: any) => {
        //let members = changes;
        //console.log('retrieved members ', members);
        //this.checkForMember(members);
        this.allChannelMembers = changes;
        this.checkForMember();
        
      });

  }

  //check if user has joined channel
  checkForMember() {
    for( let index in this.allChannelMembers) {
      let memberID = this.allChannelMembers[index].memberID;
      console.log('member id', memberID);
      if(memberID == this.userID){
        this.isMember = true;
        console.log('this member status is', this.isMember);
      } else {
        this.isMember = false;
        console.log('this member status is', this.isMember);
      }
    } 
  }

  
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
    const localSub = fromEvent(this.textArea.nativeElement, 'scroll').subscribe(() => {
      const toTop = this.textArea.nativeElement.scrollTop;
      const toLeft = this.textArea.nativeElement.scrollLeft;

      this.renderer.setProperty(this.pre.nativeElement, 'scrollTop', toTop);
      this.renderer.setProperty(this.pre.nativeElement, 'scrollLeft', toLeft + 0.2);
    });

    this.sub.add(localSub);
  }

}
