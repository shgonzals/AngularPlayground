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
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoggerService } from 'core/logger';

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
    MatDividerModule,
    ReactiveFormsModule
  ],
})
export class TaskComponent implements OnInit, AfterViewInit{


  formGroup: FormGroup;
  hideRequiredControl = new FormControl(false);

  idControl = new FormControl();
  nameControl = new FormControl('', Validators.required);
  descriptionControl = new FormControl();
  startDateControl = new FormControl('', Validators.required);
  endDateControl = new FormControl();
  statusControl = new FormControl();

  tasks: Task[] = [];
  dataSource = new MatTableDataSource<Task>(this.tasks);

  status: Status[] = [
    {key: 'N', value: 'New'},
    {key: 'S', value: 'Started'},
    {key: 'I', value: 'In progress'},
    {key: 'D', value: 'Done'},
    {key: 'S', value: 'Stopped'}
  ];

  columnsToDisplay: string[] = ['id', 'name', 'description', 'startDate', 'endDate', 'status', 'action'];

  valid: boolean = true;
  originalTask: Task | null = null;
  editMode: boolean = false;
  editedTask: Task | null = null;
  private document : Document;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private datePipe: DatePipe,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    public localStorageService: LocalStorageService,
    @Inject(DOCUMENT) document: Document,
    fb: FormBuilder,
    public loggerService: LoggerService) {
    this._locale = 'es-ES';
    this._adapter.setLocale(this._locale);
    this.document = document;

    //Deshabilitamos la edicion del id
    this.idControl.disable();

    this.formGroup = fb.group({
      hideRequired: this.hideRequiredControl,
      id: this.idControl,
      name: this.nameControl,
      description: this.descriptionControl,
      startDate: this.startDateControl,
      endDate: this.endDateControl,
      status: this.statusControl
    });
  }

  ngOnInit(): void {
    this.reloadData();
    this.loggerService.log("LOGGER-LIB WORKS!");
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

  getErrorMessage() {
    if (this.nameControl.hasError('required') || this.startDateControl.hasError('required')) {
      return 'Required';
    }
    return '';
  }
}
