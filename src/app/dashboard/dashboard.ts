import { Component } from '@angular/core';
import { TimeTableComponent } from '../components/timetable/timetable';
import { Sidebar } from '../components/sidebar/sidebar';
import { Auth } from '../services/auth/auth';
import { Requests } from '../components/requests/requests';

@Component({
  selector: 'app-dashboard',
  imports: [TimeTableComponent, Sidebar, Requests],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  userRole: string | null = null;

  constructor(private authService: Auth) {}

  currentView: 'timetable' | 'requests' = 'timetable';

  changeView(event: 'timetable' | 'requests') {
    this.currentView = event;
  }

  ngOnInit() {
    this.userRole = this.authService.getRole();
    console.log('User Role:', this.userRole);
  }
}
