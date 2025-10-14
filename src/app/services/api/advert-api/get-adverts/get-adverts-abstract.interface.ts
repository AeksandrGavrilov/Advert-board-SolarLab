import { Observable } from "rxjs";
import { AdvertInterface } from "../../../../interfaces/advert.interface";

export interface GetAdverts {
  getAdverts(): Observable<AdvertInterface[]>;
}
