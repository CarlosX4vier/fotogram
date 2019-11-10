import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-create-account',
	templateUrl: './create-account.page.html',
	styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

	accountForm: FormGroup

	constructor(private fb: FormBuilder, private navControll: NavController) { }

	ngOnInit() {
		this.createForm()
	}

	private createForm(): void {
		this.accountForm = this.fb.group({
			name: ['', [Validators.required, Validators.name]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		})
	}

	private onSubmit(): void {
		console.log(this.accountForm)
	}

	get name(): FormControl {
		return <FormControl>this.accountForm.get('name')
	}

	get email(): FormControl {
		return <FormControl>this.accountForm.get('email')
	}

	get password(): FormControl {
		return <FormControl>this.accountForm.get('password')
	}

}
