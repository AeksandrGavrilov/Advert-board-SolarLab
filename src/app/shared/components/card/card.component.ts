import { Component, inject, Input } from '@angular/core';
import { AdvertInterface } from '../../../interfaces/advert.interface';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ImagePipe } from '../../pipes/image.pipe';
import { TransformDatePipe } from '../../pipes/transform-date.pipe';


@Component({
    selector: 'app-card',
    imports: [
        CommonModule, 
        RouterLink,
        RouterModule,
        ImagePipe,
        TransformDatePipe,
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    standalone: true,
})
export class CardComponent {
    @Input() advert!: AdvertInterface;
    @Input() imageUrl!: string;
}
