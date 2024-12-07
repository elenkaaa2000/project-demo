import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Gift } from '../../types/gift';
import { AppService } from '../../app.service';
import { UserService } from '../../user/user.service';
import { AuthComponent } from '../../auth/auth.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { AuthUser } from '../../types/user';


@Component({
  selector: 'app-gift-details',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './gift-details.component.html',
  styleUrl: './gift-details.component.css'
})
export class GiftDetailsComponent implements OnInit {
  gift = {} as Gift;
  user = {} as AuthUser;
  isOwner = false;
  isBougth = false;
  isLiked = false;
  isLoading = true;

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
    this.loadGiftDetails()
  }

  loadGiftDetails() {
    this.giftId = this.route.snapshot.params['giftId']
    this.appService.getGiftById(this.giftId).subscribe({
      next: (gift) => {
        this.gift = gift
        this.isLoading = false

        if (this.isLoggedIn) {
          this.userService.getUserProfile().subscribe((user) => {
            this.user = user
            this.isOwner = this.gift.userId === user._id;
            this.isBougth = this.gift.buyingList.some(x => x.toString() == user._id);
            this.isLiked = this.gift.likesList.some(x => x.toString() == user._id);
          })
        }
      },
      error: () => {
        this.router.navigate(['/404'])
      }
    })


  }

  deleteGift() {

    this.appService.deleteGiftById(this.giftId).subscribe(() => {
      this.router.navigate(['/catalog'])
    });
  }

  likeGift() {
    this.appService.likeGift(this.giftId).subscribe(() => {
      this.isLiked = true;
      this.loadGiftDetails()
    })
  }

  buyGift() {
    this.appService.buyGift(this.giftId).subscribe(() => {
      this.isBougth = true;
      this.loadGiftDetails()
    })
  }

}
