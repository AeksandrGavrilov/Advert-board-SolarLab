import { Observable } from "rxjs";
import { CurrentUser } from "../../../interfaces/current-user";

export interface GetCurrentUser {
    getCurrentUser(): Observable<CurrentUser>;
}
