import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  
  private breadcrumbsSubject = new BehaviorSubject<MenuItem[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs = this.getSimpleBreadcrumbs();
        this.breadcrumbsSubject.next(breadcrumbs);
      });
  }

  private getSimpleBreadcrumbs(): MenuItem[] {
    const breadcrumbs: MenuItem[] = [{ label: 'Главная' }];
    
    
    let currentRoute = this.activatedRoute;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const breadcrumb = currentRoute.snapshot.data['breadcrumb'];
    if (breadcrumb && breadcrumb !== 'Главная') {
      breadcrumbs.push({ label: breadcrumb });
    }

    return breadcrumbs;
  }
}
