import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.html',
  styleUrls: ['./timetable.scss'],
  imports: [CommonModule],
})
export class TimeTableComponent {
  times: string[] = [
    '0830',
    '0930',
    '1030',
    '1130',
    '1230',
    '1330',
    '1430',
    '1530',
    '1630',
    '1730',
  ];

  days: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  lunchLetters: string[] = ['L', 'U', 'N', 'C', 'H', ' '];
}
