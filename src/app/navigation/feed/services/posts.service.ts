import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { Observable } from 'rxjs';
import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import md5 from 'md5'
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private collection: AngularFirestoreCollection<Post>
  private ref: AngularFireStorageReference


  constructor(private db: AngularFirestore, private AuthService: AutenticacaoService, private storage: AngularFireStorage) {
    this.collection = this.db.collection('/posts/')
    AuthService.estadoAutenticacao$.subscribe(user => {
      this.ref = this.storage.ref(`/${user.uid}/`)
    })

  }

   upload(image: string):Promise<string> {
    var file = md5(Date.now()) + ".png"
    var ref = this.ref.child(file)
    return ref.putString(image, "base64", { contentType: "image/png" }).then(snapshot => {
      console.log("Uploadando")
      console.log(snapshot)
      snapshot.ref.getDownloadURL().then(url => console.log(url))
      return snapshot.ref.getDownloadURL().then(url => url)
    })

  }

  create(p: Post): Promise<Post> {
    try {
      return this.collection.add(p).then(() => p);
    } catch (e) {
      console.log(e)
    }
    return this.collection.add(p).then(() => p);

  }

  update(p: Post): Promise<Post> {
    return this.collection.doc<Post>(p.id).update(p).then(() => p)
  }

  delete(p: Post): Promise<void> {
    return this.collection.doc<Post>(p.id).delete()
  }

  buscaTodos(): Observable<Post[]> {
    return this.collection.valueChanges();
  }

  buscaPorId(id: string): Observable<Post> {
    return this.collection.doc<Post>(id).valueChanges()
  }
}
