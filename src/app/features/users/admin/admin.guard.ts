import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor() { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('id_token');
    if (typeof token === "string") {
      const tokenPayload: {email: string, userId: string, role: string} = decode(token);
      if (tokenPayload['role'].toLowerCase() !== expectedRole) {
        // this.router.navigate(['/']);
        return false;
      }
    }
    return true;
  }

}
