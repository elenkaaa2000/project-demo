import { Component } from '@angular/core';
import { AppService } from '../../app.service';

import { FormsModule, NgForm } from '@angular/forms';
import { ImageUrlDirective } from '../../directives/image-url.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-gift',
  standalone: true,
  imports: [FormsModule, ImageUrlDirective],
  templateUrl: './create-gift.component.html',
  styleUrl: './create-gift.component.css'
})
export class CreateGiftComponent {
  constructor(private apiService: AppService, private router: Router) { }

  create(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form')
    }

    const { title, category, description, price, delivery, imageUrl } = form.value

    this.apiService.createGift(title, category, description, price, delivery, imageUrl).subscribe(() => {      
      this.router.navigate(['/catalog'])
    })

  }

}
