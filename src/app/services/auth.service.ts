import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import auth from 'firebase/app';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserDataService } from './user-data.service';
import { HandleLocalStorageService } from './handle-local-storage.service';

/**
 * This service deals with user authentication.
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  isAuthSub = new BehaviorSubject<any>(null);
  private authStateData: any = null;
  authStateSubject = new Subject<any>();

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private userDataService: UserDataService,
    private handleLocalStorageService: HandleLocalStorageService
  ) {
    // subscribing to the observable that authState returns
    // so that we get updated whenever the authState data gets manipulated
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        handleLocalStorageService.setUser(user.uid);
        this.userDataService.getUserDataFromFirebase();
        // sync cart data
        this.setIsAuthenticated(true);
        handleLocalStorageService.setIsAuthenticated('true');
        this.setAuthState(user);
      } else {
        this.setIsAuthenticated(false);
        handleLocalStorageService.clearDataOnLogOut();
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
      this.handleLocalStorageService.setIsAuthenticated('true');
    }
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.handleLocalStorageService.clearDataOnLogOut();
      this.setIsAuthenticated(false);
      this.setAuthState(null);
      this.router.navigate(['']);
    });
  }

  getIsAuthObservable() {
    this.isAuthSub.next(this.isAuthenticated);
    return this.isAuthSub.asObservable();
  }

  setIsAuthenticated(v: boolean) {
    this.isAuthenticated = v;
    this.isAuthSub.next(this.isAuthenticated);
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
