import { inject, Injectable } from '@angular/core';
import { DadataInterface } from '../../../interfaces/dadata-interface';
import { DadataResponseInterface } from '../../../interfaces/dadata-response-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map,tap, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DadataApiService {
 private http = inject(HttpClient);
 private API_KEY = '15e4871e9fdb0b6650cd8633e47a54b9e4e34aad';
 private API_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

 getAdressSuggestion(query:string): Observable<DadataInterface[]> {
  const headers = new  HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Token ${this.API_KEY}`
  });

  const body  = {
    query: query,
    count: 10
  };

  return this.http.post<DadataResponseInterface>(this.API_URL, body, {headers}).pipe(
    tap(response => console.log('Получен ответ от Dadata', response)),
    catchError( error => {
      console.error(' Ошибка от DaData:', error);
      return throwError(() => error)
    }),  
    map(response =>response.suggestions)
    );
 }
}
