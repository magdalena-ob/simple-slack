import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './start/login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavigationComponent } from './main-page/navigation/navigation.component';
import { DialogComponent } from './main-page/dialog/dialog.component';
import { ChannelComponent } from './main-page/dialog/channel/channel.component';
import { DirectMessageComponent } from './main-page/dialog/direct-message/direct-message.component';
import { ThreadComponent } from './main-page/dialog/thread/thread.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './start/signup/signup.component';
import { MainChatAreaComponent } from './main-page/dialog/main-chat-area/main-chat-area.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MessageBoxComponent } from './main-page/dialog/message-box/message-box.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DialogAddChannelComponent } from './dialog-add-channel/dialog-add-channel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DirectMessageAddComponent } from './main-page/dialog/direct-message-add/direct-message-add.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MultiselectAutocompleteComponent } from './main-page/multiselect-autocomplete/multiselect-autocomplete.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DialogUploadFileComponent } from './dialog-upload-file/dialog-upload-file.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FilterPipe } from './pipes/filter.pipe';
import { FirebaseService } from './services/firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent,
    MainPageComponent,
    NavigationComponent,
    DialogComponent,
    ChannelComponent,
    DirectMessageComponent,
    ThreadComponent,
    SignupComponent,
    MainChatAreaComponent,
    MessageBoxComponent,
    DialogAddChannelComponent,
    DirectMessageAddComponent,
    MultiselectAutocompleteComponent,
    DialogUploadFileComponent,
    SearchChannelComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),

    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    AngularFirestoreModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCo6_rX447wTFQ6WzoAxtdgp4l-NlRd5qE",
      authDomain: "simple-slack-af9e7.firebaseapp.com",
      //databaseURL
      projectId: "simple-slack-af9e7",
      storageBucket: "simple-slack-af9e7.appspot.com",
      messagingSenderId: "116022411182",
      appId: "1:116022411182:web:7e3693e4ddb3338d46523f"
    }),
    MatDividerModule,
    MatListModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
