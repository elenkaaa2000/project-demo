import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Gift } from '../types/gift';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component';
import { SliceTitlePipe } from '../shared/slice-title.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink,LoaderComponent, SliceTitlePipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  gifts: Gift[] = []
  isLoading=true
  constructor(private apiService: AppService) { }

  ngOnInit(): void {
    this.apiService.getAll().subscribe((gifts)=>{      
           
     this.gifts = gifts
     this.isLoading = false
    })
  }
}
