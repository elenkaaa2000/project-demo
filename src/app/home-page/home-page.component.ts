import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { Gift } from '../types/gift';

import { ErrorMsgService } from '../shared/error-msg/error-msg.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  gifts: Gift[] = []
  isLoading = true

  constructor(private apiService: AppService, private errorMsg: ErrorMsgService) { }

  ngOnInit(): void {
    this.apiService.getLastThree(3).subscribe(data => {
      this.gifts = data
      this.isLoading = false
    });

  }
}
