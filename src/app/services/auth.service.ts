import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  isAuthSubject = new Subject<any>();

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {}

  // sign in with email and password
  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // sign up with email and password
  signUp(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
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
}
