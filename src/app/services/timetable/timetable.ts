import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ClassSlot } from '../../models/class-slot.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { mapToTeacherSlot, TeacherSlot } from '../../models/teacherSlot.model';

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getWeekTimetableStudent(): Observable<ClassSlot[]> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = `${this.apiUrl}/timetable/student`;

    return this.http.get<ClassSlot[]>(url, { headers });
  }

    getWeekTimetableTeacher(): Observable<TeacherSlot[]> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    const url = `${this.apiUrl}/timetable/teacher`;
    console.log("herere");
    console.log(this.http.get<any[]>(url, { headers }));

    return this.http.get<any[]>(url, { headers }).pipe(
      map(dtos =>
        dtos.map(mapToTeacherSlot))
    );
  }
}


// }
