import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    imports: [CommonModule, MenuComponent],
})
export class NavigationComponent {
  constructor(private router: Router) {}

  shouldShowNavbar(): boolean {
    const currentUrl = this.router.url;
    return !(currentUrl === '/login' || currentUrl === '/register');
  }
}
