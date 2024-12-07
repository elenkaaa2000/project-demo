import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  errorMessage = ''
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    this.errorMessage = ''
    if (form.invalid) {
      console.log('Invalid form')
      return
    }

    const { email, password } = form.value;
    this.userService.login(email, password).subscribe({
      next: ()=>{
        this.router.navigate(['/'])
      },
      error: (error) =>{
        this.errorMessage = error.message;
        console.log(this.errorMessage);
        
      }
    
    })

  }
}
