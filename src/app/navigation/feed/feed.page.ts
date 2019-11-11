import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PostsService } from './services/posts.service';
import { Post } from './model/post'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  posts$ = new Observable<Post[]>();

  displayName: string = ""
  photoURL: string = ""
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private AuthService: AutenticacaoService, private camera: Camera, private postService: PostsService) {
  }

  ngOnInit() {

    this.carregar()
  }

  abrirGaleria(): void {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //'data:image/jpeg;base64,' + 
      let base64Image = imageData;
      let data: number = Date.now() / 1000;
      this.AuthService.estadoAutenticacao$.subscribe(async user => {

        let file = await this.postService.upload(base64Image)
        this.postService.create({ id: "", data: data, image: file } as Post);

      })
    }, (err) => {
      // Handle error
    });

  }

  carregar(): void {
    this.AuthService.estadoAutenticacao$.subscribe(user => {
      this.displayName = user.displayName
      this.photoURL = user.photoURL
      this.posts$ = this.postService.buscaTodos()

    })
  }
}
