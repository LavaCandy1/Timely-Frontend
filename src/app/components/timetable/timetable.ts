import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TimetableService } from '../../services/timetable/timetable';
import { ClassSlot } from '../../models/class-slot.model';
import { TeacherSlot } from '../../models/teacherSlot.model';
import { AdminSlot } from '../../models/adminSlot.model';
import { AdminSearchService } from '../../services/timetable/admin-search';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.html',
  styleUrls: ['./timetable.scss'],
  imports: [CommonModule],
})
export class TimeTableComponent implements OnInit {

  @Input() userRole: string | null = null;
  hoveredSlot: any = null;
  year = new Date().getFullYear();
  searchType: string = '';

  today = new Date();

  onMouseEnter(slot: any) {
    this.hoveredSlot = slot;
  }

  onMouseLeave() {
    this.hoveredSlot = null;
  }

  private searchSub: Subscription | undefined;

  allClassSlots: ClassSlot[] = [];
  allClassSlotsTeacher: TeacherSlot[] = [];
  allClassSlotsAdmin: AdminSlot[] = [];
  days: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  lunchLetters: string[] = ['L', 'U', 'N', 'C', 'H', ' '];
  times: string[] = [
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

  constructor(private timetableService: TimetableService,
              private adminSearch : AdminSearchService
  ) {}

  ngOnInit(): void {
    if (this.userRole === 'TEACHER') {
      this.timetableService.getWeekTimetableTeacher().subscribe((data) => {
        this.allClassSlotsTeacher = data;
        console.log(this.allClassSlotsTeacher);
      });
    } else if (this.userRole === 'STUDENT') {
      this.timetableService.getWeekTimetableStudent().subscribe((data) => {
        this.allClassSlots = data;
      });
    } else if (this.userRole === 'ADMIN') {
      // this.timetableService.getWeekTimetableAdmin().subscribe((data) => {
      //   this.allClassSlotsAdmin = data;
      //   console.log(this.allClassSlotsAdmin);
      // });
      this.subscribeToAdminSearch();
    }
  }

  subscribeToAdminSearch() {
    this.searchSub = this.adminSearch.searchState$.subscribe(state => {
      
      // Reset data on new search
      this.allClassSlotsAdmin = []; 

      if (state.type === 'BATCH') {
        this.searchType = state.value;
        this.timetableService.getBatchTimetableForAdmin(state.year || 'Empty' , state.value).subscribe(data => {
          this.allClassSlotsAdmin = data;
        });
      } else if (state.type === 'TEACHER') {
        this.searchType = state.value;
        this.timetableService.getWeekTimetableTeacherForAdmin(state.value).subscribe(data => {
          this.allClassSlotsAdmin = data;
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

  // used for dummy data
  // getSlotsForDay(day: string): ClassSlot[] {
  //   const fullDay = normalizeDay(day);
  //   return this.allClassSlots
  //     .filter((slot) => slot.dayOfWeek === fullDay)
  //     .sort((a, b) => a.startTime.localeCompare(b.startTime));
  // }

  getSlotForDayAndTimeStudent(day: string, time: string): ClassSlot | undefined {
    const fullDay = normalizeDay(day);
    const fullTime = normalizeTime(time);
    return this.allClassSlots.find(
      (slot) => slot.dayOfWeek === fullDay && slot.startTime === fullTime
    );
  }

  getSlotForDayAndTimeTeacher(day: string, time: string): TeacherSlot[] | undefined {
    const fullDay = normalizeDay(day);
    const fullTime = normalizeTime(time);

    return this.allClassSlotsTeacher.filter(
      (slot) => slot.dayOfWeek === fullDay && slot.startTime === fullTime
    );
  }

  getSlotForDayAndTimeAdmin(day: string, time: string): AdminSlot[] | undefined {
    const fullDay = normalizeDay(day);
    const fullTime = normalizeTime(time);

    return this.allClassSlotsAdmin.filter(
      (slot) => slot.dayOfWeek === fullDay && slot.startTime === fullTime
    );
  }


  isCancelled(slot: ClassSlot | TeacherSlot): boolean {
    if (slot.cancelledDate!=null && slot.cancelledDate > new Date().toISOString().split('T')[0]) {
      return true;
    } else {
      return false;
    }
  }

  cancel(slot: TeacherSlot): void {
    
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const todayIndex = daysOfWeek.indexOf(daysOfWeek[this.today.getDay() === 0 ? 6 : this.today.getDay() - 1]);
    const slotDayIndex = daysOfWeek.indexOf(slot.dayOfWeek);
    let daysToAdd = slotDayIndex - todayIndex;
    if (daysToAdd < 0) {
      daysToAdd += 7;
    }
    const cancelledDate = new Date(this.today);
    cancelledDate.setDate(this.today.getDate() + daysToAdd + 1);
    
    slot.cancelledDate = cancelledDate.toISOString().split('T')[0];

    this.timetableService.cancelClass(slot).subscribe(response => { 
      console.log('Class cancelled successfully', response);
      
    }, error => {
      console.error('Error cancelling class', error);
    });
  }

  reschedule(slot: TeacherSlot): void {

    slot.cancelledDate = null;
    this.timetableService.cancelClass(slot).subscribe(response => { 
      console.log('Class cancelled successfully', response);
      
    }, error => {
      console.error('Error cancelling class', error);
    });
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
