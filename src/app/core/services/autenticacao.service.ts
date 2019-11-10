import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  estadoAutenticacao$: Observable<firebase.User>

  constructor(private fbAuth: AngularFireAuth) {
    this.estadoAutenticacao$ = this.fbAuth.authState
  }

  private createAccount(name: string, email: string, password: string): Promise<auth.UserCredential> {
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(credentials =>
        credentials.user.updateProfile({ displayName: name, photoURL: "" })
          .then(() => credentials)
      )
  }

  private login(email: string, password:string):Promise<auth.UserCredential>{
    return this.fbAuth.auth.signInWithEmailAndPassword(email,password)
  }
}