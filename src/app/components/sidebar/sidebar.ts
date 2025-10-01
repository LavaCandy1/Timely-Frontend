import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  constructor(private auth: Auth) {}
  logout() {
    this.auth.logout();
    window.location.reload();
  }
}
