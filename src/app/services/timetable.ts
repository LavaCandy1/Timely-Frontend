import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClassSlot } from '../models/class-slot.model'; // Make sure this path is correct

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  // This mock data now perfectly simulates the list you'll get from your backend.
  private MOCK_DATA: ClassSlot[] = [
    {
      id: 1,
      courseCode: 'CS-301',
      instructor: 'Dr. Megha K.',
      startTime: '10:30:00',
      endTime: '11:00:00', // 30 min
      dayOfWeek: 'Monday',
      location: 'AB1-401',
      slotType: 'LECTURE',
      batch: 'A',
      group: 'A1',
      year: '3',
    },
    {
      id: 2,
      courseCode: 'EC-250',
      instructor: 'Prof. Aditi S.',
      startTime: '11:30:00',
      endTime: '12:00:00', // 30 min
      dayOfWeek: 'Monday',
      location: 'AB1-402',
      slotType: 'LECTURE',
      batch: 'A',
      group: 'A1',
      year: '3',
    },
    {
      id: 3,
      courseCode: 'CS-303',
      instructor: 'Dr. John Doe',
      startTime: '14:30:00',
      endTime: '14:30:00', // 30 min
      dayOfWeek: 'Tuesday',
      location: 'Lab 3',
      slotType: 'LAB',
      batch: 'A',
      group: 'A1',
      year: '3',
    },
    {
      id: 4,
      courseCode: 'MA-201',
      instructor: 'Dr. Jane Smith',
      startTime: '09:30:00',
      endTime: '09:30:00', // 30 min
      dayOfWeek: 'Wednesday',
      location: 'AB2-203',
      slotType: 'TUTORIAL',
      batch: 'A',
      group: 'A1',
      year: '3',
    },
    {
      id: 5,
      courseCode: 'HS-404',
      instructor: 'Dr. Alex Ray',
      startTime: '10:30:00',
      endTime: '10:30:00', // 30 min
      dayOfWeek: 'Friday',
      location: 'AB1-201',
      slotType: 'LECTURE',
      batch: 'A',
      group: 'A1',
      year: '3',
    },
  ];

  constructor() {}

  getWeekTimetable(): Observable<ClassSlot[]> {
    return of(this.MOCK_DATA);
    // Later, you will replace the line above with:
    // return this.http.get<ClassSlot[]>('/api/timetable?batch=A&year=3');
  }
}
