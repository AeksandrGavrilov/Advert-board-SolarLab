import { AdvertInterface } from "./advert.interface"

export interface CurrentUser {
    "id": string,
  "name": string,
  "role": string,
  "login": string,
  "adverts": AdvertInterface[],
  "registeredTime": string,
}
