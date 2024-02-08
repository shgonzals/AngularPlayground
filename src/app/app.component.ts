import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { ListComponent } from './components/list/list.component';
import { inject } from '@vercel/analytics';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    ListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    inject();
  }

}
