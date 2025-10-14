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

 
}
