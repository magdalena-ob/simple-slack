import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#481449';
  }

  logout(): void {
    this.afAuth.signOut();
  }

  signinGuest() {
    this.authService.signinAnonymously().then((result) => {
      if (result == null) {
        console.log('logging in...');
        this.router.navigate(['/main-page']);
      }
      else {
        console.log('login error', result);
        // this.firebaseErrorMessage = result.message;
      }
    })
  }

}
