import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { ChannelComponent } from './main-page/dialog/channel/channel.component';
import { DirectMessageAddComponent } from './main-page/dialog/direct-message-add/direct-message-add.component';
import { DirectMessageComponent } from './main-page/dialog/direct-message/direct-message.component';
import { MessageBoxComponent } from './main-page/dialog/message-box/message-box.component';
import { ThreadComponent } from './main-page/dialog/thread/thread.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './start/login/login.component';
import { SignupComponent } from './start/signup/signup.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'main-page', component: MainPageComponent, canActivate: [AuthGuard],
    children: [
      //{
      //  path:'thread',
      //  component: ThreadComponent
      //},
      {
        path:'channel/:id1',
        component: ChannelComponent,
        children : [
          {path: 'thread/:id2', component: ThreadComponent}
        ]
      },
      {
        path:'directmessage',
        component: DirectMessageComponent
      },
      { path: 'directmessageadd',
        component: DirectMessageAddComponent
      },
      { path: 'message_box',
        component: MessageBoxComponent
      },
      {
        path:'search_channel',
        component: SearchChannelComponent
      },
      {
        path:'help',
        component: HelpComponent
      }
    ]
  },
  //{ path: 'channel', component: ChannelComponent },
  { path: 'direct-message', component: DirectMessageComponent },
  //{ path: 'thread/:ID', component: ThreadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
