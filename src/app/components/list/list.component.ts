import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterOutlet,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  items = [
    { title: 'Item 1', description: 'Item 1', editing: false, disabled: true },
    { title: 'Item 2', description: 'Item 2', editing: false, disabled: true }
    // Agrega más elementos según sea necesario
  ];

  isEditing(item: any): boolean {
    return item.editing;
  }

  startEditing(item: any): void {
    // Inicia la edición del item
    item.editing = true;
  }
}
