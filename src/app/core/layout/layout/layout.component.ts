import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SearchMenuComponent } from '../../../shared/components/search-menu/search-menu.component';
import { BreadcrumpsComponent } from '../../../shared/components/breadcrump/breadcrump.component';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        SearchMenuComponent,
        BreadcrumpsComponent,
        ToastModule
    ],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent { }