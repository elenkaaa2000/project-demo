import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { macthPasswordsValidator } from '../../utils/match-passwords.validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string | null = null;
  constructor(private userService: UserService, private router: Router) { }
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
    tel: new FormControl('', [Validators.required]),
    passGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      rePassword: new FormControl('', [Validators.required])
    }, {
      validators: [macthPasswordsValidator('password', 'rePassword')]
    })
  });

  usernameControl = this.form.get('username');
  emailControl = this.form.get('email');
  telControl = this.form.get('tel');
  passGroup = this.form.get('passGroup')
  passwordControl = this.form.get('passGroup')?.get('password');
  rePassControl = this.form.get('passGroup')?.get('rePassword');

  inputRequired(controlName: string) {
    return (
      this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required']
    )
  }

  inputCorrectLength(controlName: string) {
    return (
      this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['minlength']
    )
  }

  get correctEmail() {
    return (
      this.emailControl?.touched && this.emailControl?.errors?.['email']
    )
  }

  register() {
    this.errorMessage = ''
    if (this.form.invalid) {
      console.log('Invalid form')
      return
    }

    const { username, email, tel, passGroup: { password, rePassword } = {} } = this.form.value;
    this.userService
      .register(username!, email!, tel!, password!, rePassword!)
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/'])
        },
        error: (error) => {
          this.errorMessage = error.message;       
        }

      })


  }
}