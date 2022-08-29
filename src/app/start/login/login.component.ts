import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    firebaseErrorMessage: string;
    lastUrl: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        private afAuth: AngularFireAuth,
        public localStorage: LocalStorageService,
        private elementRef: ElementRef) {
        this.loginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });

        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
        this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#481449';

        this.getLastUrl();
    }

    loginUser() {
        if (this.loginForm.invalid)
            return;

        this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
            if (result == null) {                               // null is success, false means there was an error
                console.log('logging in...');
                this.router.navigate(['/main-page/help']);    
            }
            else if (result.isValid == false) {
                console.log('login error', result);
                this.firebaseErrorMessage = result.message;
            }
        });
    }

    getLastUrl() {
        this.localStorage.loadLastURL();
        this.lastUrl = this.localStorage.lastURL;
    }

}
