import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { Gift } from '../types/gift';


import { LoaderComponent } from '../shared/loader/loader.component';
import { SliceTitlePipe } from '../shared/slice-title.pipe';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, LoaderComponent, SliceTitlePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  gifts: Gift[] = []
  isLoading = true

  constructor(private apiService: AppService) { }

  ngOnInit(): void {
    this.apiService.getLastThree(3).subscribe(data => {
      this.gifts = data
      this.isLoading = false
    });

  }
}
