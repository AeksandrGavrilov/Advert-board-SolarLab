import { Component, input } from '@angular/core';
import { AdvertInterface } from '../../../interfaces/advert.interface';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { ImagePipe } from '../../pipes/image.pipe';

@Component({
  selector: 'app-card-grid',
  imports: [
    CommonModule,
    CardComponent,
    // ImagePipe,
    ],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss',
  standalone: true,
})
export class CardGridComponent {
  adverts = input.required<AdvertInterface[]>({})
  imageUrls = input.required<Record<string, string>>({})
}
