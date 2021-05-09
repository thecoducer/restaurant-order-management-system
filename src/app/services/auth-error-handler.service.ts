import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthErrorHandlerService {
  private errorSubject = new Subject<any>();

  private errorObj = {
    logIn: {
      errorFound: null,
      email: null,
      password: null,
      unknown: null,
    },
    signUp: {
      errorFound: null,
      name: null,
      email: null,
      password: null,
      unknown: null,
    },
  };

  constructor() {}

  getErrorObservable() {
    return this.errorSubject.asObservable();
  }

  initializeErrorObj() {
    this.errorSubject.next(this.errorObj);
  }

  foundLogInError() {
    return !(this.errorObj.logIn.errorFound === null);
  }

  foundSignUpError() {
    return !(this.errorObj.signUp.errorFound === null);
  }

  handleAuthError(errorParam: any, callerParam: string) {
    if (callerParam === 'logIn') {
      this.errorObj.logIn.errorFound = true;

      switch (errorParam.code) {
        case 'auth/user-not-found':
          this.errorObj.logIn.email = 'Email not registered.';
          break;

        case 'auth/wrong-password':
          this.errorObj.logIn.password = "Password doesn't match.";
          break;

        default:
          this.errorObj.logIn.unknown = errorParam.message;
          break;
      }
    } else if (callerParam === 'signUp') {
      switch (errorParam.code) {
        case 'auth/email-already-in-use':
          this.errorObj.signUp.email = 'Email already in use.';
          break;

        case 'auth/invalid-email':
          this.errorObj.signUp.email = 'Please enter a valid email.';
          break;

        default:
          this.errorObj.signUp.unknown = errorParam.message;
          break;
      }
    }

    this.errorSubject.next(this.errorObj);
  }

  // set all error logIn fields to null
  clearLogInError() {
    Object.entries(this.errorObj.logIn).forEach(([key, val]) => {
      this.errorObj.logIn[key] = null;
    });

    this.errorSubject.next(this.errorObj);
  }

  // set all error signUp fields to null
  clearSignUpError() {
    Object.entries(this.errorObj.signUp).forEach(([key, val]) => {
      this.errorObj.signUp[key] = null;
    });

    this.errorSubject.next(this.errorObj);
  }
}
