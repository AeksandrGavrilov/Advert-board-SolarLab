import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../core/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly API_URL = environment.API_URL;
  private http = inject(HttpClient);

  getImgUrlById(imageId: string): string {
  return `${this.API_URL}/Images/${imageId}`
  };

}
