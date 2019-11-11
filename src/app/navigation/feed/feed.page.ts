import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PostsService } from './services/posts.service';
import { Post } from './model/post'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  items;
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
    this.postService.buscaTodos().forEach(post => {this.items= post})
  }


  postar(): void {
    this.postService.create({ autor: "3", texto: "Texte", data: 13123, image: "" } as Post);
  }

  abrirGaleria(): void {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
    }, (err) => {
      // Handle error
    });

  }

  carregar(): void {
    this.AuthService.estadoAutenticacao$.subscribe(user => {
      this.displayName = user.displayName
      this.photoURL = user.photoURL
    })
  }
}
