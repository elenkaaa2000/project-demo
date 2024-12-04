import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Gift } from '../../types/gift';
import { AppService } from '../../app.service';
import { UserService } from '../../user/user.service';
import { AuthComponent } from '../../auth/auth.component';


@Component({
  selector: 'app-gift-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gift-details.component.html',
  styleUrl: './gift-details.component.css'
})
export class GiftDetailsComponent implements OnInit {
  gift = {} as Gift;
  isOwner = false;
  isBougth = false;
  isLiked = false;

  private giftId!: string;

  get isLoggedIn(): boolean {
    return this.userService.isLogged
  }

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.giftId = this.route.snapshot.params['giftId'];
    this.appService.getGiftById(this.giftId).subscribe((gift) => {
      this.gift = gift

      this.userService.getUserProfile().subscribe((user) => {
        this.isOwner = user._id == this.gift.userId;

        this.isBougth = this.gift.buyingList.some(x => x.toString() == user._id);
        this.isLiked = this.gift.likesList.some(x => x.toString() == user._id);
      });
    })
  }

  deleteGift() {

    this.appService.deleteGiftById(this.giftId).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: (err: any) => console.log('Error deleting', err)
    });
  }

  likeGift() {

    this.appService.likeGift(this.giftId).subscribe((gift) => {   
      this.isLiked = true
      this.router.navigate([this.router.url])
    })
  }

  buyGift() {

    this.appService.buyGift(this.giftId).subscribe(() => {
      this.isBougth = true
      this.router.navigate([this.router.url])
    })
  }

}
