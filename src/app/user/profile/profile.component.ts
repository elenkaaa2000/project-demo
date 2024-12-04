import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthUser } from '../../types/user';
import { Gift } from '../../types/gift';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: AuthUser | null = null  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((userData) => {     
      this.user = userData         
    })
  }

}
