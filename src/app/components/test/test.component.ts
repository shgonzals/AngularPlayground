import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { Task } from '../../models/task';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [
    DatePipe
  ],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule
  ],
})
export class TestComponent {

  dataSource: Task[] = [
    { id: 1, name: 'Task 1', description: 'Desc', endDate: new Date(), startDate: new Date(), status: 'New' },
    { id: 2, name: 'Task 2', description: 'Desc 2', startDate: new Date(), status: 'Old' }
  ];

  columnsToDisplay: string[] = ['id', 'name', 'description', 'startDate', 'endDate', 'status', 'action'];
  editMode: boolean = false;
  editedTask: Task | null = null;

  constructor(private datePipe: DatePipe) {}

  edit(task: Task) {
    // Establece el modo de edición solo para la tarea seleccionada
    this.editedTask = task;
  }

  remove(task: Task) {
    // Establece el modo de edición solo para la tarea seleccionada
    this.editedTask = task;
  }


  saveTask(task: Task) {
    // Guarda los cambios y desactiva el modo de edición
    this.editedTask = null;
  }
}
