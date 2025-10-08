import { Component, Input } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  searchType: string = 'null'; // default


  constructor(private auth: Auth) {}

  toggleSearch() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }
}
