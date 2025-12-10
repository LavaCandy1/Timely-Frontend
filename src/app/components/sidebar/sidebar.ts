import { Component, Input } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSearchService } from '../../services/timetable/admin-search';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() userRole: string | null = null;
  public isOpen = false; 
  today = new Date();
  searchType: string = 'null';

  teacherName: string = '';
  batch: string = '';
  year: string = '';
  
  
  constructor(private auth: Auth,
              private adminSearch : AdminSearchService
            ) {}

  toggleSearch() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }

  searchTimetable() {
    if (this.searchType === 'teacher') {
      console.log('Searching timetable for teacher:', this.teacherName);
      this.adminSearch.updateSearch('TEACHER', this.teacherName);
      this.isOpen = false;
    }
    else if (this.searchType === 'batch') {
      console.log('Searching timetable for batch:', this.batch, 'Year:', this.year);
      this.adminSearch.updateSearch('BATCH', this.batch, this.year);
      this.isOpen = false;
    }
  }
}
