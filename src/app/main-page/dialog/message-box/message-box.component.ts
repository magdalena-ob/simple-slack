import { AfterViewChecked, AfterViewInit, OnDestroy, Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadFileComponent } from 'src/app/dialog-upload-file/dialog-upload-file.component';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/models/message.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { SyntaxHighlightingService } from '../../../services/syntax-highlighting.service';
import { FormBuilder } from '@angular/forms';



export interface ImageURL {
  imgURL: any;
}

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

  toggle = true;
  status = 'Enable';

  channelId : any;
  threadId: any;
  message = new Message();
  timeSent: Date = new Date();
  chatID: any;

  user: Observable<any> | null;
  uid: any;
  fromUser: any;

  downloadUrl: any;

  imgURL: string = '';
  imgUploaded: boolean =  false;
  @ViewChild('img') myImgElem!: ElementRef;

  @ViewChild('textArea', { static: true })
  textArea!: ElementRef;
  @ViewChild('codeContent', { static: true })
  codeContent!: ElementRef;
  @ViewChild('pre', { static: true })
  pre!: ElementRef;

  sub!: Subscription;
  highlighted = false;
  codeType = 'javascript';

  codeBlock: boolean;

  files: any;
  img!: HTMLImageElement;
  document!: { getElementById: (arg0: string) => { (): any; new(): any; src: string; }; };

  form = this.fb.group({
    content: ''
  });

  get contentControl() {
    return this.form.get('content');
  }

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute, 
    private firestore: AngularFirestore, 
    public afAuth: AngularFireAuth,
    private prismService: SyntaxHighlightingService,
    private fb: FormBuilder,
    private renderer: Renderer2) {
    this.user = null;
    this.codeBlock = false;
   }

   text = `constructor(
    private prismService: SyntaxHighlightingService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) { }`;

  ngOnInit(): void {
    this.listenForm();
      this.synchronizeScroll();


      this.route.params.subscribe((params) => {
        console.log('whole param', params);
        this.channelId = params.id1;
        this.threadId = params.id2;
        this.chatID = params.ID;
        
        console.log('got thread id ', this.threadId);
        console.log('got chat id ', this.chatID);
    //this.route.paramMap.subscribe( paramMap => {
    //  this.channelId = paramMap.get('id1');
    //  console.log('got channel id ', this.channelId);

      this.getCurrentUserId();
      
    })
  }

  
  openImgUpload() {
    let dialog = this.dialog.open(DialogUploadFileComponent);

    dialog.afterClosed().subscribe((result: any) => {
      this.imgURL = result;
      console.log('image URL is ', this.imgURL);
      this.imgUploaded = true;
    })

  }

  // openFiles() {
  //  this.img.src= URL.createObjectURL(this.downloadUrl);
  //  //this.document.getElementById('textArea').src = 'this.downloadUrl';
  //}

  getCurrentUserId() {
    this.afAuth.authState
      .subscribe((user: any) => {
        console.log('user message-box ', user);
        
        if (user) {
          this.uid = user.uid;
          this.fromUser = user.displayName;

          let emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
          this.user.subscribe((changes) => {
            this.fromUser = changes.displayName;
            //console.log('display name' , this.fromUser);
          } )
         
        }
      });
  }


  sendMessage() {
    if (this.chatID) {                        //send message in private chat
      console.log('this is a private chat');
      this.sendChatMessage();
    } else {                                  //send message in channel
      if(this.locationThread()) {
        console.log('message for thread');
        this.commentMessage();
      } else {
        this.sendChannelMessage();
      }
    } 
  }

  sendChatMessage(){
    this.message.timeSent = this.timeSent.getTime();
    this.message.fromID = this.uid;
    this.message.fromName = this.fromUser;                     //to get uid from user who sent the message
    this.message.image = this.imgURL;
    this.message.codeBlock = this.codeBlock;
    this.message.channelID = this.chatID;
                                 
    this.firestore
    .collection('chats')
    .doc(this.chatID)
    .collection('messages')
    .add(this.message.toJSON())
    .then((result:any) =>{
      console.log('finished adding message' , result);
      this.message.textMessage = '';
      this.myImgElem.nativeElement.src = '';
      this.imgUploaded = false;
    });
  }

  sendChannelMessage() {
    this.message.timeSent = this.timeSent.getTime();
    this.message.fromID = this.uid;
    this.message.fromName = this.fromUser;                     //to get uid from user who sent the message
    this.message.image = this.imgURL;
    this.message.codeBlock = this.codeBlock;
    this.message.channelID = this.channelId;
                                 
    this.firestore
    .collection('channels')
    .doc(this.channelId)
    .collection('messages')
    .add(this.message.toJSON())
    .then((result:any) =>{
      console.log('finished adding message' , result);
      this.message.textMessage = '';
      this.myImgElem.nativeElement.src = '';
      this.imgUploaded = false;
    });
  }

  //answer message in Thread
  commentMessage() {
    this.message.timeSent = this.timeSent.getTime();
      this.message.fromID = this.uid;
      this.message.fromName = this.fromUser;                     
      this.message.image = this.imgURL;
      this.message.codeBlock = this.codeBlock;
      this.message.channelID = this.channelId;

    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .collection('messages')
      .doc(this.threadId)
      .collection('comments')
      .add(this.message.toJSON())
      .then((result:any) =>{
        console.log('finished adding comment' , result);
        this.message.textMessage = '';
        this.myImgElem.nativeElement.src = '';
        this.imgUploaded = false;
      });
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
    this.codeBlock = !this.codeBlock;
    this.highlighted = !this.highlighted;
    console.log('cb wert',this.codeBlock);
  }

  ngAfterViewInit() {
    this.prismService.highlightAll();
    console.log('prism afterviewinit');
  }

  ngAfterViewChecked() {
    if (this.highlighted) {
      this.prismService.highlightAll();
      this.highlighted = false;
      console.log('prism afterviewchecked');
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

  locationThread() {
    return window.location.href.indexOf("thread") > -1;
  }

}
