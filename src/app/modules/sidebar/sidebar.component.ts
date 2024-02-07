import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ListComponent } from '../../components/list/list.component';
import { MatListModule } from '@angular/material/list';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SidenavComponent,
    ListComponent,
    MatListModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('collapseMenu', [
      state('expanded', style({
        width: '250px' // Define el ancho expandido del menú
      })),
      state('collapsed', style({
        width: '55px' // Define el ancho colapsado del menú
      })),
      transition('expanded => collapsed', [
        animate('0.3s ease-out') // Define la animación de expansión a colapso
      ]),
      transition('collapsed => expanded', [
        animate('0.3s ease-out') // Define la animación de colapso a expansión
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SidebarComponent {
  collapsed = signal(false);
  isAskifyVisible = true;
  sidenavWidth = computed(() => this.collapsed() ? '55px' : '250px');


  toggleMenu() {
    this.collapsed.set(!this.collapsed());
    setTimeout(() => {
      this.isAskifyVisible = !this.isAskifyVisible;
    }, 50);

  }
}
