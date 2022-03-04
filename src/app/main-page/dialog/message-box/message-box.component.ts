import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadFileComponent } from 'src/app/dialog-upload-file/dialog-upload-file.component';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/models/message.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { SyntaxHighlightingService } from '../../../services/syntax-highlighting.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  toggle = true;
  status = 'Enable';

  channelId : any;
  message = new Message();
  timeSent: Date = new Date();

  user: Observable<any> | null;
  uid: any;
  fromUser: any;

  downloadUrl: any;

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

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.channelId = paramMap.get('id1');
      console.log('got channel id ', this.channelId);

      this.getCurrentUserId();
      this.synchronizeScroll();
      
    })
  }

  //openDialog() {
  //  this.dialog.open(DialogUploadFileComponent);
  //}

  openDialog() {
    let dialog = this.dialog.open(DialogUploadFileComponent);
    dialog.componentInstance.dialogRef
      .afterClosed()
      .subscribe(() => {
      this.downloadUrl = dialog.componentInstance.downloadUrl;
    });
  }

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


  toSendMessage() {
    this.message.timeSent = this.timeSent.getTime();
    this.message.fromID = this.uid;
    this.message.fromName = this.fromUser;                     //to get uid from user who sent the message
                                
    this.firestore
    .collection('channels')
    .doc(this.channelId)
    .collection('messages')
    .add(this.message.toJSON())
    .then((result:any) =>{
      console.log('finished adding message' , result);
    });
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
    this.codeBlock = !this.codeBlock;
    console.log('cb wert',this.codeBlock);
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
    const localSub  = fromEvent(this.textArea.nativeElement, 'scroll').subscribe(() => {
      const toTop = this.textArea.nativeElement.scrollTop;
      const toLeft = this.textArea.nativeElement.scrollLeft;

      this.renderer.setProperty(this.pre.nativeElement, 'scrollTop', toTop);
      this.renderer.setProperty(this.pre.nativeElement, 'scrollLeft', toLeft + 0.2);
    });

    this.sub.add(localSub);
  }


}
