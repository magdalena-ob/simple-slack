import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './start/login/login.component';
import { SignupComponent } from './start/signup/signup.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {path:'',component:StartComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'main-page',component:MainPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
