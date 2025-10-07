import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environmets/environmets';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CategoryInterface } from '../../../interfaces/category.interface';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private readonly API_URL = environment.API_URL;
  private http = inject(HttpClient);
 
  getAllCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(`${this.API_URL}/Categories`);
  }

  getCategoryById(id: string): Observable<CategoryInterface> {
    return this.http.get<CategoryInterface>(`${this.API_URL}/Categories/${id}`);
  }

  getCategoriesTree(): Observable<CategoryInterface[]> { 
    return this.getAllCategories().pipe(
      map(categories => this.buildCategoriesTree(categories))
    );
  }

  private buildCategoriesTree(categories: CategoryInterface[]): CategoryInterface[] {
    const categoryMap: { [id: string]: CategoryInterface } = {};
    const tree: CategoryInterface[] = [];

    categories.forEach(category => {
      categoryMap[category.id] = { ...category, items: [] }; 
    });

    categories.forEach(category => {
      const node = categoryMap[category.id];

      if (category.parentId === '00000000-0000-0000-0000-000000000000') {
        tree.push(node);
      } else if (categoryMap[category.parentId]) { 
        if (!categoryMap[category.parentId].items) {
          categoryMap[category.parentId].items = [];
        }
        categoryMap[category.parentId].items!.push(node);
      }
    });

    return tree;
  }
}
