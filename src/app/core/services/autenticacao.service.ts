import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreModule, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  estadoAutenticacao$: Observable<firebase.User>
  private collection: AngularFirestoreCollection;

  constructor(private fbAuth: AngularFireAuth, private db: AngularFirestore) {
    this.estadoAutenticacao$ = this.fbAuth.authState
    this.collection = this.db.collection('/user/')
  }

  createAccount(name: string, email: string, password: string): Promise<auth.UserCredential> {
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(credentials => {
          this.collection.doc(`/${credentials.user.uid}/`).set({ displayName: name, photoURL: ""})
        return credentials.user.updateProfile({ displayName: name, photoURL: "" })
          .then(() => credentials)
      }
      )
  }

  logar(email: string, password: string): Promise<auth.UserCredential> {
    return this.fbAuth.auth.signInWithEmailAndPassword(email, password)
  }
}