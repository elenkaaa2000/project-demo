import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthUser } from '../../types/user';

import { Router, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, LoaderComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: AuthUser | null = null
  isLoading = true
  isEditMode = false

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
    tel: new FormControl('', [Validators.required])
  })

  usernameControl = this.form.get('username');
  emailControl = this.form.get('email');
  telControl = this.form.get('tel');

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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.userService.getUserProfile().subscribe((userData) => {
      this.user = userData;
      this.isLoading = false
      const { username, email, tel } = userData
      this.form.setValue({ username, email, tel })
    })
  }


  toggleEditMode() {
    this.isEditMode = !this.isEditMode
  }

  save() {
    if (this.form.invalid) {
      console.log('invalid');

    }
    const { username, email, tel } = this.form.value;
    this.userService.editProfile(username!, email!, tel!).subscribe(() => {
      this.loadData()
      this.toggleEditMode()

    })
  }

  cancel(e: Event) {
    e.preventDefault()
    this.toggleEditMode()
  }


  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/'])
    })
  }


}
