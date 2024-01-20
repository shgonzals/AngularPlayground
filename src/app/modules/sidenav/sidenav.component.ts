import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '../../models/menuitem';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  items: MenuItem[] = [
    {
      icon: 'list',
      label: 'Listado',
      route: 'list'
    }
  ];
}
