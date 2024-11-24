import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { Gift } from '../types/gift';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  gifts: Gift[] = []
constructor(private apiService: AppService){}

ngOnInit(): void {
  this.apiService.getLastThree(3).subscribe(data=>{
    this.gifts = data
  })
}
}
