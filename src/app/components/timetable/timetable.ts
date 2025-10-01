import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TimetableService } from '../../services/timetable/timetable';
import { ClassSlot } from '../../models/class-slot.model';
import { TeacherSlot } from '../../models/teacherSlot.model';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.html',
  styleUrls: ['./timetable.scss'],
  imports: [CommonModule],
})
export class TimeTableComponent implements OnInit {

  @Input() userRole: string | null = null;
  hoveredSlot: any = null;

  onMouseEnter(slot : any){
    this.hoveredSlot = slot;    
  }

  onMouseLeave(){
    this.hoveredSlot = null;    
  }

  public allClassSlots: ClassSlot[] = [];
  public allClassSlotsTeacher: TeacherSlot[] = [];
  public days: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  public lunchLetters: string[] = ['L', 'U', 'N', 'C', 'H', ' '];
  public times: string[] = [
    '08:30',
    '09:30',
    '10:30',
    '11:30',
    '12:30',
    '13:30',
    '14:30',
    '15:30',
    '16:30',
    '17:30',
  ];

  constructor(private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.timetableService.getWeekTimetableStudent().subscribe((data) => {
      this.allClassSlots = data;
      // console.log('Fetched Class Slots:', this.allClassSlots);
    });
    this.timetableService.getWeekTimetableTeacher().subscribe((data) => {
      this.allClassSlotsTeacher = data;
      // console.log('Fetched Teacher Slots:', this.allClassSlotsTeacher);
    });
  }
  getSlotsForDay(day: string): ClassSlot[] {
    const fullDay = normalizeDay(day);
    return this.allClassSlots
      .filter((slot) => slot.dayOfWeek === fullDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  getSlotForDayAndTimeStudent(day: string, time: string): ClassSlot | undefined {
    const fullDay = normalizeDay(day);
    const fullTime = normalizeTime(time);
    return this.allClassSlots.find(
      (slot) => slot.dayOfWeek === fullDay && slot.startTime === fullTime
    );
  }

  getSlotForDayAndTimeTeacher(day: string, time: string): TeacherSlot | undefined {
    const fullDay = normalizeDay(day);
    const fullTime = normalizeTime(time);
    return this.allClassSlotsTeacher.find(
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
  if (time.length === 5) {
    // console.log(`${time.slice(0, 5)}:00`);
    return `${time}:00`;
  }
  return time;
}
