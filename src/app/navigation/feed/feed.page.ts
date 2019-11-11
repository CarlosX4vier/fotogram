import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  displayName: string = ""
  photoURL: string = ""

  constructor(private AuthService: AutenticacaoService) {
  }

  ngOnInit() {
    this.carregar()
  }

  carregar(): void {
    this.AuthService.estadoAutenticacao$.subscribe(user => {
      this.displayName = user.displayName
      this.photoURL = user.photoURL
    })
  }
}
