import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '../../models/menu-item';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [

  ]
})
export class SidenavComponent {


  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }


  items: MenuItem[] = [
    {
      icon: 'home',
      label: 'Home',
      route: 'init'
    },{
      icon: 'event_note',
      label: 'Tasks',
      route: 'tasks'
    },{
      icon: 'list',
      label: 'Demo',
      route: 'table'
    }
  ];
}
