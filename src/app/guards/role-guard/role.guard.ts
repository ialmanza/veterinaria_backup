import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../../components/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor( private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('currentUserRole');
    if (userRole === 'administrador') {
      return true;
    }

    this.router.navigate(['/access-denied']);
    return false;
  }
}
