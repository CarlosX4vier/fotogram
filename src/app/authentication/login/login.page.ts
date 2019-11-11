import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  autenticaForm: FormGroup;

  constructor(private navCtrl: NavController, private fb: FormBuilder, private AuthService: AutenticacaoService) { }

  ngOnInit() {
    this.createForm();
  }


  async onSubmit(): Promise<void> {
    console.log(this.autenticaForm)
    try {
      const credential = await this.AuthService.logar(this.autenticaForm.get('email').value, this.autenticaForm.get('password').value);
      this.navCtrl.navigateForward('feed')
      console.log(credential)
    } catch (error) {
      console.log(error)
    }
  }

  private createForm(): void {
    this.autenticaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl {
    return <FormControl>this.autenticaForm.get('email')
  }

  get password(): FormControl {
    return <FormControl>this.autenticaForm.get('password')
  }

}
