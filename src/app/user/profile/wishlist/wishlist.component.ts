import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { AuthUser } from '../../../types/user';
import { UserService } from '../../user.service';
import { RouterLink } from '@angular/router';
import { SliceTitlePipe } from '../../../shared/slice-title.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [LoaderComponent, RouterLink, SliceTitlePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  user: AuthUser | null = null;
  isLoading = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.userService.getUserProfile().subscribe((user) => {
      this.user = user;
      this.isLoading = false
    })
  }

  removeItem(id: string): void { 
    
    this.userService.removeItemFromWishlist(id).subscribe(() => {
      this.loadData()
    })
  }
}
