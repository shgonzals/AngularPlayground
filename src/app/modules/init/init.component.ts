import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 1 }),
        animate('800ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-50%)' }),
        animate('900ms ease-in-out', style({ transform: 'translateX(0%)'})),
      ]),
    ]),
  ]
})
export class InitComponent {

}
