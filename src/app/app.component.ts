import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SearchMenuComponent } from "./shared/components/search-menu/search-menu.component";

import { NgForOf } from "../../node_modules/@angular/common/common_module.d-NEF7UaHr";
import { CardGridComponent } from './shared/components/card-grid/card-grid.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SearchMenuComponent,
    CardGridComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'ad-board-angular';


}
