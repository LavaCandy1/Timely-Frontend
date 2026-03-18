import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {

  protected openedRequestId = signal<number | null>(null);
  requestType = input<string>("");

  protected locations = [
    'BLA101',
    'BLA202',];
  protected requests = [
    {
      id: 1,
      slotType: 'LECTURE',
      courseCode: 'CSET502',
      dayOfWeek: 'Monday',
      startTime: '10:30',
      location: null,
      instructor: 'Amritesh Kumar',
      batch: 'B40',
      group: '',
      year: '4th',
      status: 'PENDING',
      reason: 'Topics left to teach before midsems.',
      createdAt: '12/05/22'
    },
    {
      id: 2,
      slotType: 'LAB',
      courseCode: 'CSET211',
      dayOfWeek: 'Wednesday',
      startTime: '14:00',
      location: null,
      instructor: 'Dr. S. Sharma',
      batch: 'B12',
      group: 'G1',
      year: '2nd',
      status: 'APPROVED',
      reason: 'Extra practical time for project completion.',
      createdAt: '15/05/22'
    },
    {
      id: 3,
      slotType: 'TUTORIAL',
      courseCode: 'MATH301',
      dayOfWeek: 'Friday',
      startTime: '09:00',
      location: null,
      instructor: 'Prof. Rajat Gupta',
      batch: 'B05',
      group: '',
      year: '3rd',
      status: 'PENDING',
      reason: 'Doubt clearing session for Calculus module.',
      createdAt: '18/05/22'
    },
    {
      id: 4,
      slotType: 'LECTURE',
      courseCode: 'CSET405',
      dayOfWeek: 'Tuesday',
      startTime: '11:45',
      location: null,
      instructor: 'Megha Verma',
      batch: 'B22',
      group: '',
      year: '4th',
      status: 'REJECTED',
      reason: 'Makeup class for the missed holiday session.',
      createdAt: '20/05/22'
    },
    {
      id: 5,
      slotType: 'LECTURE',
      courseCode: 'SOFT102',
      dayOfWeek: 'Thursday',
      startTime: '15:30',
      location: null,
      instructor: 'Ananya Singh',
      batch: 'B31',
      group: 'G2',
      year: '1st',
      status: 'PENDING',
      reason: 'Introduction to new software testing tools.',
      createdAt: '22/05/22'
    }
  ];

  protected openRequest(id: number) {
    if (this.openedRequestId() === id) {
      this.openedRequestId.set(null);
    } else {
      this.openedRequestId.set(id);
    }
  }
}
