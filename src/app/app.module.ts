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
    ThreadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
