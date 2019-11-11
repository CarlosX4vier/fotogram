import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private collection: AngularFirestoreCollection<Post>

  constructor(private db: AngularFirestore, private AuthService: AutenticacaoService) {
    this.db.collection('/posts/')
  }

  create(p: Post): Promise<Post> {
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
