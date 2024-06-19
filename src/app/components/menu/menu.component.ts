import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor( private router: Router) { }

  ngOnInit(): void {
    const drawerToggle = document.getElementById('drawer-toggle');
    const drawerNavigation = document.getElementById('drawer-navigation');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose = document.getElementById('drawer-close');
    const drawerHoverArea = document.getElementById('drawer-hover-area');

  //   function openDrawer() {
  //     drawerNavigation!.classList.remove('-translate-x-full');
  //     drawerOverlay!.classList.remove('hidden');
  //   }

  //   function closeDrawer() {
  //     drawerNavigation!.classList.add('-translate-x-full');
  //     drawerOverlay!.classList.add('hidden');
  //   }

  //   drawerToggle!.addEventListener('click', function () {
  //     if (drawerNavigation!.classList.contains('-translate-x-full')) {
  //       openDrawer();
  //     } else {
  //       closeDrawer();
  //     }
  //   });

  //   drawerClose!.addEventListener('click', closeDrawer);
  //   drawerOverlay!.addEventListener('click', closeDrawer);
  // }
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

}
