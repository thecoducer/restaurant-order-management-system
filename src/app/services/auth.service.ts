import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import auth from 'firebase/app';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserDataService } from './user-data.service';

/**
 * This service deals with user authentication.
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  isAuthSubject = new Subject<any>();
  private authStateData: any = null;
  authStateSubject = new Subject<any>();

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private userDataService: UserDataService
  ) {
    // subscribing to the observable that authState returns
    // so that we get updated whenever the authState data gets manipulated
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', user.uid);
        this.userDataService.getUserDataFromFirebase();

        this.setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');

        this.setAuthState(user);
      } else {
        localStorage.setItem('user', null);
        this.setIsAuthenticated(false);
        localStorage.setItem('isAuthenticated', 'false');
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

  authenticateWithGoogle(): Promise<any> {
    return this.afAuth.signInWithPopup(new auth.auth.GoogleAuthProvider());
  }

  autoLogIn() {
    if (localStorage.getItem('user') != null) {
      this.setIsAuthenticated(true);
    }
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.setIsAuthenticated(false);
      this.setAuthState(null);
      this.router.navigate(['']);
    });
  }

  getIsAuthObservable() {
    return this.isAuthSubject.asObservable();
  }

  initializeIsAuth() {
    this.isAuthSubject.next(this.isAuthenticated);
  }

  setIsAuthenticated(v: boolean) {
    this.isAuthenticated = v;
    this.isAuthSubject.next(this.isAuthenticated);
  }

  //
  getAuthStateObservable() {
    return this.authStateSubject.asObservable();
  }

  setAuthState(data: any) {
    this.authStateData = data;
    this.authStateSubject.next(this.authStateData);
  }
  //
}
