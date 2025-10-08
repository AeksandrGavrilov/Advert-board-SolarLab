import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../environmets/environmets';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
 private readonly API_URL = environment.API_URL;
 private http = inject(HttpClient);

 getImgUrlById(imageId: string): string {
  return `${this.API_URL}/Images/${imageId}`
 };

 getImgById(imageId: string): Observable<Blob> {
  return this.http.get(
    `${this.API_URL}/Images/${imageId}` ,
    {responseType: "blob"}
  )
 };

 uploadImage(advertId: string, imageFile: File): Observable<any> {
  const formData = new FormData();
  formData.append('AdvertId', advertId);
  formData.append('Content', imageFile, imageFile.name);

  return this.http.post<any>(
    `${this.API_URL}/Images`,
    formData
  );
 };

 uploadSomeImages(advertId:string, imageFiles: File[]): Observable<any> {
  const uploadRequests = imageFiles.map(file =>
    this.uploadImage(advertId, file)
  );
  return forkJoin(uploadRequests)
 }
}
