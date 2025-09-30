import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
 private readonly API_URL = "http://dzitskiy.ru:5000";
 private http = inject(HttpClient);

 getImgUrlById(imageId: string): string {
  return `${this.API_URL}/Images/${imageId}`
 }

 getImgById(imageId: string): Observable<Blob> {
  return this.http.get(
    `${this.API_URL}/Images/${imageId}` ,
    {responseType: "blob"}
  )
 }
}
