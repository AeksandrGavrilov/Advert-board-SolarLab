import { InjectionToken } from "@angular/core";
import { GetAdverts } from "./get-adverts-abstract.interface";

export const GetAdvertsServiceToken = new InjectionToken<GetAdverts>('TOKEN') 