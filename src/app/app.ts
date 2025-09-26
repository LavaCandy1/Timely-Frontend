import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimeTableComponent } from './components/timetable/timetable';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TimeTableComponent, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('timely-app');
}
