import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';
import { DemoComponent } from './components/demo/demo.component';
import { InitComponent } from './modules/init/init.component';

export const routes: Routes = [
  { path: 'init', component: InitComponent},
  { path: '', redirectTo: 'init', pathMatch : 'full'},{
    path: 'list',
    component: ListComponent
  },{
    path: 'tasks',
    component: TaskComponent
  },{
    path: 'demo',
    component: DemoComponent
  }
];
