import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

type SlotPreview = {
  day: string;
  time: string;
  courseCode: string;
  room: string;
  type: 'lecture' | 'tutorial' | 'lab';
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  isCompactRibbonVisible = false;

  readonly quickStats = [
    { value: 'Real-time Sync', label: 'Backend-served timetable distribution' },
    { value: 'Verified Rooms', label: 'Room allocations aligned with current updates' },
    { value: 'Zero-Conflict', label: 'Managed release of schedule changes and requests' },
  ];

  readonly tutorials = [
    {
      title: 'Access Current Schedule State',
      description:
        'Students and faculty open a live weekly view instead of relying on stale timetable exports.',
    },
    {
      title: 'Propagate Administrative Changes',
      description:
        'Room shifts, extra classes, and timetable edits move through one controlled distribution layer.',
    },
    {
      title: 'Resolve Formal Requests',
      description:
        'Leave, reschedule, and room-change requests are managed alongside the schedule they affect.',
    },
  ];

  readonly legends = [
    {
      title: 'Lecture',
      subtitle: 'Primary instructional delivery',
      type: 'lecture',
      slot: 'MON 08:30',
    },
    {
      title: 'Tutorial',
      subtitle: 'Discussion and reinforcement block',
      type: 'tutorial',
      slot: 'WED 11:30',
    },
    {
      title: 'Lab',
      subtitle: 'Practical and facility-bound session',
      type: 'lab',
      slot: 'FRI 14:30',
    },
  ];

  readonly days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  readonly times = ['08:30', '10:30', '11:30', '14:30'];

  readonly slotPreview: SlotPreview[] = [
    {
      day: 'MON',
      time: '08:30',
      courseCode: 'CSE201',
      room: 'LH-201',
      type: 'lecture',
    },
    {
      day: 'TUE',
      time: '10:30',
      courseCode: 'MAT214',
      room: 'CR-104',
      type: 'tutorial',
    },
    {
      day: 'WED',
      time: '11:30',
      courseCode: 'PHY112',
      room: 'LAB-3',
      type: 'lab',
    },
    {
      day: 'THU',
      time: '08:30',
      courseCode: 'CSE201',
      room: 'LH-201',
      type: 'lecture',
    },
    {
      day: 'FRI',
      time: '14:30',
      courseCode: 'ECE220',
      room: 'LAB-1',
      type: 'lab',
    },
    {
      day: 'SAT',
      time: '10:30',
      courseCode: 'HSS105',
      room: 'CR-12',
      type: 'tutorial',
    },
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isCompactRibbonVisible = window.scrollY > 140;
  }

  getSlot(day: string, time: string): SlotPreview | undefined {
    return this.slotPreview.find((slot) => slot.day === day && slot.time === time);
  }
}
