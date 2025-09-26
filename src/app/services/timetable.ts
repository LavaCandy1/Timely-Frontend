import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// Import the new, updated model

import { ClassSlot } from '../models/class-slot.model';

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  // New mock data that reflects your detailed backend model
  private MOCK_DATA: ClassSlot[] = [
    {
      id: 1,
      courseCode: 'CS-301',
      instructor: 'Dr. Megha K.',
      startTime: '10:00:00',
      endTime: '11:00:00',
      dayOfWeek: 'Monday',
      location: 'AB1-401',
      slotType: 'LECTURE',
      batch: 'A',
      group: 'A1',
      year: '3',
    },
    {
      id: 2,
      courseCode: 'CS-303',
      instructor: 'Dr. John Doe',
      startTime: '14:00:00',
      endTime: '15:00:00',
      dayOfWeek: 'Tuesday',
      location: 'Lab 3',
      slotType: 'LAB',
      batch: 'A',
      group: 'A1',
      year: '3',
    },
    {
      id: 3,
      courseCode: 'MA-201',
      instructor: 'Dr. Jane Smith',
      startTime: '09:00:00',
      endTime: '10:00:00',
      dayOfWeek: 'Wednesday',
      location: 'AB2-203',
      slotType: 'TUTORIAL',
      batch: 'A',
      group: 'A1',
      year: '3',
    },
  ];

  constructor() {}

  // Update the function to return an Observable of the new ClassSlot[] type
  getWeekTimetable(): Observable<ClassSlot[]> {
    return of(this.MOCK_DATA);

    // When your backend is ready, the call will look like this:
    // return this.http.get<ClassSlot[]>('https://your-api.com/student/timetable');
  }
}
