import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  get isLogged(): boolean {
    return this.userService.isLogged
  };


  constructor(private userService: UserService, private router: Router) { }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/'])
    })
  }
}
