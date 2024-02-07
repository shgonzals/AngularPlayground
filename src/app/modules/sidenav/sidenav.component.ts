import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '../../models/MenuItem';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
  styleUrl: './sidenav.component.scss'
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
      icon: 'list',
      label: 'List',
      route: 'table'
    },{
      icon: 'table',
      label: 'Table',
      route: 'list'
    },{
      icon: 'edit',
      label: 'Test',
      route: 'test'
    }
  ];
}
