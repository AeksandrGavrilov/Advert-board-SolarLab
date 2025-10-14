import { InjectionToken } from '@angular/core';
import { GetCurrentUser } from './get-current-useri-abstract.interface';



export const GetCurrentUserServiceToken = new InjectionToken<GetCurrentUser>('GET_CURRENT_USER_SERVICE_TOKEN');

