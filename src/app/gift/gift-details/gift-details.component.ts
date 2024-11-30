import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Gift } from '../../types/gift';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-gift-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gift-details.component.html',
  styleUrl: './gift-details.component.css'
})
export class GiftDetailsComponent implements OnInit {
  gift = {} as Gift;
  
  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router){}

 ngOnInit(): void {
  const id = this.route.snapshot.params['giftId'];
   this.appService.getGiftById(id).subscribe((gift)=>{        
    this.gift = gift
   })
 } 
}
