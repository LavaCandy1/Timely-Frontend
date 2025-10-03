import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  public isCollapsed = false;
  today = new Date();
  constructor(private auth: Auth) {}
  logout() {
    this.auth.logout();
    window.location.reload();
  }
}
