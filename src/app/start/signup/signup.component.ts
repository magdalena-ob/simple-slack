import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  firebaseErrorMessage: string;
  user = new User();

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'displayName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  signup() {
    if (this.signupForm.invalid)                            // if there's an error in the form, don't submit it
      return;

    this.authService.signupUser(this.signupForm.value).then((result: any) => {
      if (result == null) {                            // null is success, false means there was an error

        this.firestore.collection('users').add(this.user.toJSON()).then((result: any) => {
          console.log('User added', result);
        });

        this.router.navigate(['/main-page']);
      }
      else if (result.isValid == false)
        this.firebaseErrorMessage = result.message;
    }).catch(() => {

    });
  }

}
