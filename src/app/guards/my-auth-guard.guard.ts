// import { CanActivateFn } from '@angular/router';

// export const myAuthGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../components/Auth/auth.service'; // Suponiendo que tienes un servicio de autenticación
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return of(this.authService.isAuthenticated())
      .pipe(
        map((isAuthenticated: any) => {
          if (isAuthenticated) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
  }
}
