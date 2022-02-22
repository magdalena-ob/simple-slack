import { Injectable } from '@angular/core';
import { User } from 'src/models/user.class';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new User();
  userLoggedIn: boolean;      // other components can check on this variable for the login status of the user

    constructor(private router: Router, private afAuth: AngularFireAuth, private firestore:AngularFirestore) {
        this.userLoggedIn = false;

        this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
            if (user) {
                this.userLoggedIn = true;
            } else {
                this.userLoggedIn = false;
            }
        });
    }

    loginUser(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Auth Service: loginUser: success');
                // this.router.navigate(['/dashboard']);
            })
            .catch(error => {
                console.log('Auth Service: login error...');
                console.log('error code', error.code);
                console.log('error', error);
                if (error.code)
                    return { isValid: false, message: error.message };
            });
    }

    signupUser(user: any): Promise<any> {
        return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                let emailLower = user.email.toLowerCase();

               // this.firestore.doc('/testUsers/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
                // .set({
                //    displayName: user.displayName,
                //    displayName_lower: user.displayName.toLowerCase(),
                //    email: user.email,
                //    email_lower: emailLower
                //});

                
                result.user!.sendEmailVerification();                    // immediately send the user a verification email
            })
            .catch(error => {
                console.log('Auth Service: signup error', error);
                if (error.code)
                    return { isValid: false, message: error.message };
            });
    }
    
}
