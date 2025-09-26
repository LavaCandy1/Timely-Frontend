import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../services/timetable';
import { ClassSlot } from '../../models/class-slot.model';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.html',
  styleUrls: ['./timetable.scss'],
  imports: [CommonModule],
})
export class TimeTableComponent implements OnInit {
  public allClassSlots: ClassSlot[] = [];
  public days: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  public lunchLetters: string[] = ['L', 'U', 'N', 'C', 'H', ' '];
  public times: string[] = [
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

  constructor(private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.timetableService.getWeekTimetable().subscribe((data) => {
      this.allClassSlots = data;
      // console.log('Fetched Class Slots:', this.allClassSlots);
    });
  }
  getSlotsForDay(day: string): ClassSlot[] {
    const fullDay = normalizeDay(day);
    return this.allClassSlots
      .filter((slot) => slot.dayOfWeek === fullDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  getSlotForDayAndTime(day: string, time: string): ClassSlot | undefined {
    const fullDay = normalizeDay(day);
    const fullTime = normalizeTime(time);
    return this.allClassSlots.find(
      (slot) => slot.dayOfWeek === fullDay && slot.startTime === fullTime
    );
  }
}

function normalizeDay(dayAbbr: string): string {
  const map: { [key: string]: string } = {
    MON: 'Monday',
    TUE: 'Tuesday',
    WED: 'Wednesday',
    THU: 'Thursday',
    FRI: 'Friday',
    SAT: 'Saturday',
    SUN: 'Sunday',
  };
  return map[dayAbbr] || dayAbbr;
}

function normalizeTime(time: string): string {
  if (time.length === 4) {
    console.log(`${time.slice(0, 2)}:${time.slice(2, 4)}:00`);
    return `${time.slice(0, 2)}:${time.slice(2, 4)}:00`;
  }
  return time;
}
