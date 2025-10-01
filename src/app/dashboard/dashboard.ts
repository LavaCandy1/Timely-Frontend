import { Component } from '@angular/core';
import { TimeTableComponent } from '../components/timetable/timetable';
import { Sidebar } from '../components/sidebar/sidebar';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-dashboard',
  imports: [TimeTableComponent, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  userRole: string | null = null;

  constructor(private authService: Auth) {}

  ngOnInit() {
    this.userRole = this.authService.getRole();
    console.log('User Role:', this.userRole);
  }
}
