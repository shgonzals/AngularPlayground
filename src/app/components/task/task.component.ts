import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { Task } from '../../models/task';
import { Status } from '../../models/status';
import { CommonModule, DOCUMENT, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { LocalStorageService } from '../../services/local-storage.service';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
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
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDividerModule
  ],
})
export class TaskComponent implements OnInit, AfterViewInit{

  tasks: Task[] = [];
  dataSource = new MatTableDataSource<Task>(this.tasks);

  status: Status[] = [
    {key: 'N', value: 'New'},
    {key: 'O', value: 'Old'}
  ];

  columnsToDisplay: string[] = ['id', 'name', 'description', 'startDate', 'endDate', 'status', 'action'];

  originalTask: Task | null = null;
  editMode: boolean = false;
  editedTask: Task | null = null;
  private document : Document;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private datePipe: DatePipe,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    public localStorageService: LocalStorageService,
    @Inject(DOCUMENT) document: Document) {
    this._locale = 'es-ES';
    this._adapter.setLocale(this._locale);
    this.document = document;
  }

  ngOnInit(): void {
    this.reloadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  reloadData(){
    this.tasks = this.localStorageService.getAll();
    this.dataSource.data = this.tasks;
  }

  edit(task: any) {
    if(task){
      this.originalTask = { ...task };
      this.editMode = true;
      task.editing = true;
    }
  }

  remove(task: any) {
    if(task){
      this.localStorageService.removeTask(task.id.toString());
      this.reloadData();
    }
  }

  save(task: Task) {
    this.editMode = false;
    task.editing = false;
    this.localStorageService.addTask(task.id.toString(), JSON.stringify(task));
    this.reloadData();
  }

  cancel(task: Task) {
    if(this.editMode && this.originalTask){
      this.localStorageService.addTask(this.originalTask.id.toString(), JSON.stringify(this.originalTask));
      this.originalTask = null;
    }else{
      this.remove(task);
    }

    this.editMode = false;
    task.editing = false;

    this.reloadData();
  }

  addData() {
    var lastId = (this.tasks.length + 1);

    const newTask: Task = {
      id: lastId,
      name: "",
      description: "",
      startDate: new Date(),
      status: "N",
      editing: true
    };

    this.localStorageService.addTask(lastId.toString(), JSON.stringify(newTask));
    this.reloadData();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
