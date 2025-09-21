import { Component, OnInit, inject } from '@angular/core';
import { Advert } from '../../../interfaces/advert.interface';
import { AdvertService } from '../../../../services/business-logic/advert.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-card-grid',
  imports: [
    CommonModule,
    CardComponent,
    ],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss',
  standalone: true,
})
export class CardGridComponent implements OnInit{
  private advertService = inject(AdvertService);
  adverts: Advert[] = [];

  ngOnInit(): void {
    this.loadAdverts()
  }

  loadAdverts(): void {
    this.advertService.searchAdvert({}).subscribe({
      next: (response) => {
        this.adverts = response  ;
      }
    })
  }
  
}
