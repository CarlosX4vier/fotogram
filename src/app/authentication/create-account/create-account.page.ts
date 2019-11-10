import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  createAccountForm: FormGroup

  constructor(private fb: FormBuilder, private navControll: NavController) { }

  ngOnInit() {
    this.createForm()
  }

  private createForm(): void {
    this.createAccountForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  private onSubmit():void{
console.log(this.createAccountForm)
  }

  get name(): FormControl {
    return <FormControl>this.createAccountForm.get('name')
  }

  get email(): FormControl {
    return <FormControl>this.createAccountForm.get('email')
  }

  get password(): FormControl {
    return <FormControl>this.createAccountForm.get('password')
  }

}
