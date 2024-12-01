import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private _authService = inject(AuthService)

  constructor( private router: Router) { }

  ngOnInit(): void {
    const drawerToggle = document.getElementById('drawer-toggle');
    const drawerNavigation = document.getElementById('drawer-navigation');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose = document.getElementById('drawer-close');
    const drawerHoverArea = document.getElementById('drawer-hover-area');


  function openDrawer() {
    drawerNavigation!.classList.remove('drawer-hidden', '-translate-x-full');
    drawerNavigation!.classList.add('drawer-visible', 'translate-x-0');
    drawerOverlay!.classList.remove('hidden');
  }

  function closeDrawer() {
    drawerNavigation!.classList.remove('drawer-visible', 'translate-x-0');
    drawerNavigation!.classList.add('drawer-hidden', '-translate-x-full');
    drawerOverlay!.classList.add('hidden');
  }

  drawerToggle!.addEventListener('click', function () {
    if (drawerNavigation!.classList.contains('drawer-hidden')) {
      openDrawer();
    } else {
      closeDrawer();
    }
  });

  drawerClose!.addEventListener('click', closeDrawer);
  drawerOverlay!.addEventListener('click', closeDrawer);
  drawerHoverArea!.addEventListener('mouseenter', openDrawer);
  drawerNavigation!.addEventListener('mouseleave', closeDrawer);
}

  async logout() {
    await this._authService.signOut();
    this.router.navigate(['/login']);
  }
}
