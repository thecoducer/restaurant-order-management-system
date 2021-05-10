import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  isAuthSubject = new Subject<any>();
  private authStateData: any = null;
  private userUid: string;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    // subscribing to the observable that authState returns
    // so that we get updated whenever the authState data gets manipulated
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authStateData = user;
        this.userUid = user.uid;

        localStorage.setItem('user', this.userUid);

        this.setIsAuthenticated(true);
        //console.log('auth if', this.isAuthenticated)
        //console.log(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        this.setIsAuthenticated(false);
        //console.log('auth else', this.isAuthenticated)
        //JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // sign in with email and password
  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // sign up with email and password
  signUp(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  autoLogIn() {
    console.log('auto login out', this.isAuthenticated);
    if (localStorage.getItem('user') != null && this.authStateData != null) {
      this.setIsAuthenticated(true);
      //console.log('auto login if', this.isAuthenticated)
    } else {
      this.setIsAuthenticated(false);
      //console.log('auto login else', this.isAuthenticated)
    }
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.setIsAuthenticated(false);
      //console.log('logout', this.isAuthenticated)
      this.authStateData = null;
      this.userUid = null;
      this.router.navigate(['']);
    });
  }

  getIsAuthObservable() {
    return this.isAuthSubject.asObservable();
  }

  initializeIsAuth() {
    //console.log('auth initailize', this.isAuthenticated)
    this.isAuthSubject.next(this.isAuthenticated);
  }

  setIsAuthenticated(v: boolean) {
    this.isAuthenticated = v;
    this.isAuthSubject.next(this.isAuthenticated);
  }
}
