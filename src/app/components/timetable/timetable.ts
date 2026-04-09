import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, resource } from '@angular/core';
import { TimetableService } from '../../services/timetable/timetable';
import { ClassSlot, SlotType } from '../../models/class-slot.model';
import { TeacherSlot } from '../../models/teacherSlot.model';
import { AdminSlot } from '../../models/adminSlot.model';
import { AdminSearchService } from '../../services/timetable/admin-search';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ExtraClassRequest } from '../../models/extraClass-request';
import { ExtraClass } from '../../services/requests/extraClass';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-timetable',
  standalone: true,
  templateUrl: './timetable.html',
  styleUrls: ['./timetable.scss'],
  imports: [CommonModule, FormsModule, MatSnackBarModule],
})
export class TimeTableComponent implements OnInit {

  @Input() userRole: string | null = null;
  hoveredSlot: any = null;
  year = new Date().getFullYear();
  searchType: string = '';

  today = new Date();

  // needs for add class form
  isFormOpen: boolean = false; 
  isEditFormOpen: boolean = false;
  editClassIds: string[] = [];
  newClass: Partial<ClassSlot> = {
    courseCode: '',
    instructor: '',
    batch: '',
    year: '',
    group: '', 
    slotType: 'LECTURE' as SlotType,
    dayOfWeek: 'Monday',
    startTime: '08:30',
    location: ''
  };
  
  newRequest: Partial<ExtraClassRequest> = {
    slotType: 'LECTURE' as SlotType,
    courseCode: '',
    dayOfWeek: 'Monday',
    startTime: '08:30',
    group: '',
    batch: '',
    year: '',
    reason: ''
  };

  // needs for extra class form
  isExtraClassOpen: boolean = false;


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
  fullDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // lunchLetters: string[] = ['L', 'U', 'N', 'C', 'H', ' '];
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
              private adminSearch : AdminSearchService,
              private extraClassService : ExtraClass,
              private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.userRole === 'TEACHER') {
      this.timetableService.getWeekTimetableTeacher().subscribe((data) => {
        this.allClassSlotsTeacher = data;
        // console.log(this.allClassSlotsTeacher);
      });
    } else if (this.userRole === 'STUDENT') {
      this.timetableService.getWeekTimetableStudent().subscribe((data) => {
        this.allClassSlots = data;
      });
    } else if (this.userRole === 'ADMIN') {
      this.subscribeToAdminSearch();
      //TODO try to use this to update the page when adding a class
    }
  }

  subscribeToAdminSearch() {
    this.searchSub = this.adminSearch.searchState$.subscribe(state => {
      
      // Reset data on new search
      this.allClassSlotsAdmin = []; 

      if (state.type === 'BATCH') {
        this.searchType = state.type;
        this.timetableService.getBatchTimetableForAdmin(state.year || 'Empty' , state.value).subscribe(data => {
          this.allClassSlotsAdmin = data;
          console.log("Admin Batch Search Result:", this.allClassSlotsAdmin);
        });
      } else if (state.type === 'TEACHER') {
        this.searchType = state.type;
        this.timetableService.getWeekTimetableTeacherForAdmin(state.value).subscribe(data => {
          this.allClassSlotsAdmin = data;
          console.log("Admin Teacher Search Result:", this.allClassSlotsAdmin);
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
      // console.log('Class cancelled successfully', response);
      this.snackBar.open('Class cancelled successfully', 'Close', {
        duration: 3000
      });
      
    }, error => {
      console.error('Error cancelling class', error);
      this.snackBar.open('Failed to cancel class', 'Close', {
        duration: 3000
      });
    });
  }

  reinstate(slot: TeacherSlot): void {

    slot.cancelledDate = null;
    this.timetableService.cancelClass(slot).subscribe(response => { 
      // console.log('Class cancelled successfully', response);
      this.snackBar.open('Class reinstated successfully', 'Close', {
        duration: 3000
      });
      
    }, error => {
      console.error('Error cancelling class', error);
      this.snackBar.open('Failed to reinstate class', 'Close', {
        duration: 3000
      });
    });
  }
  
  delete(slot: AdminSlot): void {
    this.timetableService.deleteClass(slot).subscribe(response => {
      console.log('Class deleted successfully', response);
      this.snackBar.open('Class deleted successfully', 'Close', {
        duration: 3000
      });
    }, error => {
      console.error('Error deleting class', error);
      this.snackBar.open('Failed to delete class', 'Close', {
        duration: 3000
      });
    });
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
  }
  
  //add class methods
  submitAddClass() {
    // console.log("Submitting:", this.newClass);

    // Sending form data directly as requested
    this.timetableService.addClass(this.newClass).subscribe({
      next: (res) => {
        // console.log("Class Added Successfully", res);
        this.isFormOpen = false;
        this.resetForm();
        this.snackBar.open('Class Added Successfully', 'Close', {
          duration: 3000
        });
        // Optional: refresh logic if you want to see the new class immediately
        if (this.searchType === 'BATCH' && this.newClass.batch && this.newClass.year) {
           // Trigger a refresh manually if needed, or rely on user to search again
        }
      },
      error: (err) => {
        console.error("Error adding class", err);
        this.snackBar.open('Failed to add class', 'Close', {
          duration: 3000
        });
        this.resetForm();
      }
    });
  }

  // extra request methods
  sumbmitExtraClassRequest(): void {
    // console.log("Submitting ExtraClass Request:", this.newRequest);
    this.isFormOpen = false;
    // this.resetForm();

    //submit the request to backend
    this.extraClassService.createExtraClassRequest(this.newRequest as ExtraClassRequest).subscribe({
      next: (res) => {
        // console.log("ExtraClass Request Submitted Successfully /n ", res);
        this.snackBar.open('Extra Class Request Submitted Successfully', 'Close', {
          duration: 3000
        });
        this.resetForm();
      },
      error: (err) => {
        console.error("Error submitting extraClass request", err);
        this.snackBar.open('Failed to submit Extra Class Request', 'Close', {
          duration: 3000
        });
        this.resetForm();
      }
    });

  }

  resetForm() {
    this.newClass = {
      courseCode: '',
      instructor: '',
      batch: '',
      year: '',
      group: '',
      slotType: 'LECTURE' as SlotType,
      dayOfWeek: 'Monday',
      startTime: '08:30',
      location: ''
    };
    this.newRequest = {
      slotType: 'LECTURE' as SlotType,
      courseCode: '',
      dayOfWeek: 'Monday',
      startTime: '08:30',
      group: '',
      batch: '',
      year: '',
      reason: ''
    };
  }

  editFormToggle(adminSlot?: AdminSlot) {
    
    if (adminSlot && !this.isEditFormOpen) {
      this.isEditFormOpen = !this.isEditFormOpen;
      this.newClass = {
        courseCode: adminSlot.courseCode,
        instructor: adminSlot.instructor,
        batch: adminSlot.batches.length > 0 ? adminSlot.batches.join(', ') : 'No Batches',
        year: '', // Year is not provided in AdminSlot, you may need to adjust this
        group: '', // Group is not provided in AdminSlot, you may need to adjust this
        slotType: adminSlot.slotType,
        dayOfWeek: adminSlot.dayOfWeek,
        startTime: adminSlot.startTime ? adminSlot.startTime.slice(0, 5) : '', // Assuming startTime is in "HH:MM:SS" format, we take only "HH:MM"
        location: adminSlot.location
      };
      this.editClassIds = adminSlot.ids;
    } else {
      this.isEditFormOpen = !this.isEditFormOpen;
      this.resetForm();
      this.editClassIds = [];
    }
  }
  isUpdatingClass: boolean = false;
  updateClass(): void {
    if (this.isUpdatingClass) return; // Prevent multiple simultaneous updates\
    
    this.isUpdatingClass = true;
    this.timetableService.updateClass(this.editClassIds, this.newClass).subscribe({
      next: (res) => {
        this.isEditFormOpen = false;
        this.resetForm();
        const message = res === 1 
        ? `${res} Class updated successfully` 
        : `${res} Classes updated successfully`;
        this.snackBar.open(message, 'Close', { 
          duration: 3000
        })
        this.isUpdatingClass = false;
      },
      error: (err) => {
        console.error("Error updating class", err);
        this.snackBar.open('Failed to update class', 'Close', {
          duration: 3000
        });
        this.isUpdatingClass = false;
      }
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