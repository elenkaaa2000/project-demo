import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageUrlDirective } from '../../directives/image-url.directive';
import { AppService } from '../../app.service';
import { Gift } from '../../types/gift';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-gift',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective],
  templateUrl: './edit-gift.component.html',
  styleUrl: './edit-gift.component.css'
})
export class EditGiftComponent {
  gift = {} as Gift;

  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['giftId'];
    this.appService.getGiftById(id).subscribe((gift) => {
      this.gift = gift
    })
  }


  edit(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form')
    }

    console.log(form.value)
  }
}
