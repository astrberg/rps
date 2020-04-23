import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

    user: firebase.User = null;

    constructor(
        private authFireBase: AngularFireAuth,
        private router: Router
    ) {

        this.authFireBase.authState.subscribe(user => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;

            }
        });
    }

    signup(email: string, password: string) {
        return this.authFireBase.createUserWithEmailAndPassword(email, password);
    }

    login(email: string, password: string) {
        return this.authFireBase.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.authFireBase.signOut()
            .then((res) => this.router.navigate(['/login']));
    }

    resetPassword(email: string) {
        return this.authFireBase.sendPasswordResetEmail(email)
            .then((res) => {
                alert('A password reset link has been sent to ' + email);
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    changePassword(currentPassword: string, newPassword: string) {
        const credentials = firebase.auth.EmailAuthProvider.credential(this.user.email, currentPassword);
        return this.user.reauthenticateWithCredential(credentials)
            .then(() => {
                return this.user.updatePassword(newPassword);
            });

    }

    deleteUser(password: string) {
        const credentials = firebase.auth.EmailAuthProvider.credential(this.user.email, password);
        return this.user.reauthenticateWithCredential(credentials)
            .then(() => {
                return this.user.delete()
                    .then((res) => {
                        alert("Account deleted.")
                        this.logout();
                    })
                    .catch((err) => {
                        alert("Something went wrong...")
                        console.log(err);
                    })
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    getUsername() {
        return this.user ? this.user.email.split('@')[0] : null;

    }

    getUID() {
        return this.user ? this.user.uid : null;
    }
}
