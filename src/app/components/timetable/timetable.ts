import { Component, OnInit } from '@angular/core';
// import { TimetableService } from '../../services/timetable.service';
import { TimetableService } from '../../services/timetable';
// import { ClassSlot } from '../../models/timeslot.model';
import { ClassSlot } from '../../models/class-slot.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.html',
  imports: [CommonModule],
})
export class TimeTableComponent implements OnInit {
  public days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  public timeSlots: ClassSlot[] = [];

  constructor(private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.timetableService.getWeekTimetable().subscribe((data) => {
      this.timeSlots = data;
    });
  }

  // Helper function to get classes for a specific day
  getSlotsForDay(dayIndex: number): ClassSlot[] {
    return this.timeSlots.filter((slot) => Number(slot.dayOfWeek) === dayIndex + 1);
  }
}
