import { CommonModule } from '@angular/common';
import { Component, HostListener, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { SystemHealthService } from '../../services/system-health/system-health';

type SlotPreview = {
  day: string;
  time: string;
  courseCode: string;
  room: string;
  type: 'lecture' | 'tutorial' | 'lab';
};

type SystemStatus = 'checking' | 'online' | 'offline';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly systemHealthService = inject(SystemHealthService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  isCompactRibbonVisible = false;
  readonly systemStatus = signal<SystemStatus>('checking');
  readonly systemStatusLabel = computed(() => {
    const status = this.systemStatus();

    if (status === 'online') {
      return 'System Online';
    }

    if (status === 'offline') {
      return 'System Offline';
    }

    return 'Checking System';
  });
  readonly systemStatusTone = computed(() => {
    const status = this.systemStatus();

    if (status === 'online') {
      return 'online';
    }

    if (status === 'offline') {
      return 'offline';
    }

    return 'checking';
  });
  readonly systemStatusColor = computed(() => {
    const status = this.systemStatus();

    if (status === 'offline') {
      return '#c86c67';
    }

    if (status === 'checking') {
      return '#d1a14a';
    }

    return '#79c7a3';
  });
  readonly systemStatusBackgroundColor = computed(() => {
    const status = this.systemStatus();

    if (status === 'offline') {
      return 'rgba(200, 108, 103, 0.18)';
    }

    if (status === 'checking') {
      return 'rgba(209, 161, 74, 0.18)';
    }

    return 'rgba(121, 199, 163, 0.2)';
  });
  readonly systemStatusBorderColor = computed(() => {
    const status = this.systemStatus();

    if (status === 'offline') {
      return 'rgba(200, 108, 103, 0.38)';
    }

    if (status === 'checking') {
      return 'rgba(209, 161, 74, 0.38)';
    }

    return 'rgba(121, 199, 163, 0.42)';
  });
  readonly systemStatusShadow = computed(() => {
    if (this.systemStatus() === 'online') {
      return '0 0 0 rgba(121, 199, 163, 0.4)';
    }

    return 'none';
  });
  readonly systemStatusAnimation = computed(() =>
    this.systemStatus() === 'online' ? 'livePulse 1.8s ease-out infinite' : 'none'
  );
  readonly systemStatusTextColor = computed(() => {
    const status = this.systemStatus();

    if (status === 'offline') {
      return '#8a433f';
    }

    if (status === 'checking') {
      return '#6c5e49';
    }

    return '#1b2b45';
  });
  readonly systemStatusActionLabel = computed(() => {
    if (this.systemStatus() === 'checking') {
      return 'Checking...';
    }

    return 'Refresh system health';
  });

  readonly quickStats = [
    { value: 'Real-time Sync', label: 'Backend-served timetable distribution' },
    { value: 'Verified Rooms', label: 'Room allocations aligned with current updates' },
    { value: 'Zero-Conflict', label: 'Managed release of schedule changes and requests' },
  ];

  constructor() {
    if (this.isBrowser) {
      this.refreshSystemStatus(true);
    }
  }

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

  refreshSystemStatus(force = false): void {
    if (!this.isBrowser || (!force && this.systemStatus() === 'checking')) {
      return;
    }

    this.systemStatus.set('checking');
    this.systemHealthService
      .checkHealth()
      .pipe(take(1))
      .subscribe({
        next: (status) => this.systemStatus.set(status),
        error: () => this.systemStatus.set('offline'),
      });
  }

  getSlot(day: string, time: string): SlotPreview | undefined {
    return this.slotPreview.find((slot) => slot.day === day && slot.time === time);
  }
}
