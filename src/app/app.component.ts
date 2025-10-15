import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SearchMenuComponent } from "./shared/components/search-menu/search-menu.component";
import { ToastModule } from 'primeng/toast';
import { BreadcrumpsComponent } from './shared/components/breadcrump/breadcrump.component';




@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SearchMenuComponent,
    ToastModule,
    BreadcrumpsComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'ad-board-angular';


}
