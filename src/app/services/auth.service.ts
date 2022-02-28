import { Injectable } from '@angular/core';
//import { User } from 'src/models/user.class';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    //user = new User();
    userLoggedIn: boolean;      // other components can check on this variable for the login status of the user
  
    constructor(private router: Router, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
        
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
                //if (error.code)
                //    return { isValid: false, message: error.message };
                if (error.code == 'auth/wrong-password') {
                    return {isValid: false, message: 'Dein Passwort ist leider falsch!'};
                } else if (error.code == 'auth/user-not-found') {
                    return {isValid: false, message: 'Es konnte kein User mit dieser Email gefunden werden!'};
                }
            });
    }

    signupUser(user: any): Promise<any> {
        return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                let uid = result.user?.uid;
                let emailLower = user.email.toLowerCase();

                this.firestore.doc('/users/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
                    .set({
                        displayName: user.displayName,
                        displayName_lower: user.displayName.toLowerCase(),
                        email: user.email,
                        email_lower: emailLower,
                        status: 'aktive',
                        uid,
                        channels: []
                    });

                result.user!.sendEmailVerification();                    // immediately send the user a verification email
            })
            .catch(error => {
                console.log('Auth Service: signup error', error);
                //if (error.code)
                //    return { isValid: false, message: error.message };
                if (error.code == 'auth/email-already-in-use') {
                    return { isValid: false, message: 'Diese E-mail-Adresse ist bereits in Verwendung!'};
                } else return { isValid: false, message: error.message};
            });
    }

}
