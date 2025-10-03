import { Component } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-menu',
  imports: [
    MegaMenuModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './search-menu.component.html',
  styleUrl: './search-menu.component.scss',
  standalone: true,
})
export class SearchMenuComponent {


}
