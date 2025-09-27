import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClassSlot } from '../models/class-slot.model'; // Make sure this path is correct
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWeekTimetable(): Observable<ClassSlot[]> {
    const url = `${this.apiUrl}/timetable/teacher/Arun Singh Bhadwal`;
    return this.http.get<ClassSlot[]>(url);
  }
}
