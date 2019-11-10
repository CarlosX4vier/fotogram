import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-recover-password',
	templateUrl: './recover-password.page.html',
	styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

	recoverForm: FormGroup

	constructor(private fb: FormBuilder, private navControll: NavController) { }

	ngOnInit() {
		this.createForm()
	}

	private createForm(): void {
		this.recoverForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]]
		})
	}

	private onSubmit(): void {
		console.log(this.recoverForm)
	}

	get email(): FormControl {
		return <FormControl>this.recoverForm.get('email')
	}

}
