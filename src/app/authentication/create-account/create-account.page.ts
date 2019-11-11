import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
	selector: 'app-create-account',
	templateUrl: './create-account.page.html',
	styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

	accountForm: FormGroup

	constructor(private fb: FormBuilder, private navControll: NavController, private AuthService: AutenticacaoService) { }

	ngOnInit() {
		this.createForm()
	}

	private createForm(): void {
		this.accountForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(6)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		})
	}

	private async onSubmit(): Promise<void> {
		try {
			await this.AuthService.createAccount(this.accountForm.get('name').value, this.accountForm.get('email').value, this.accountForm.get('password').value)
			this.navControll.navigateForward('feed')
			console.log(this.accountForm)
		} catch (error) {
			console.log(error)

		}
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
