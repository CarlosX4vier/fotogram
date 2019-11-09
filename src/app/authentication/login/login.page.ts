import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  autenticaForm: FormGroup;

  constructor(private navCtrl: NavController, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }


  private onSubmit():void{
console.log(this.autenticaForm)
  }

  private createForm(): void {
    this.autenticaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl{
    return <FormControl>this.autenticaForm.get('email')
  }

  get password():FormControl{
    return <FormControl>this.autenticaForm.get('password')
  }

}
