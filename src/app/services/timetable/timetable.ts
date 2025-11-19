import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ClassSlot } from '../../models/class-slot.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { mapToTeacherSlot, TeacherSlot } from '../../models/teacherSlot.model';
import { AdminSlot, mapToAdminSlot } from '../../models/adminSlot.model';

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

  

  cancelClass(slot: TeacherSlot): Observable<void> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${this.apiUrl}/timetable/cancelClass`;
    console.log("Cancelling class");
    console.log(slot);

    return this.http.post<void>(url, slot, { headers });
  }

  // ADMIN METHODS 

  getBatchTimetableForAdmin(year : string, batch : string): Observable<AdminSlot[]> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${this.apiUrl}/timetable/admin/batch/${year}/${batch}`;
    console.log(url);
    return this.http.get<AdminSlot[]>(url, { headers }).pipe(
      map(dtos =>
        dtos.map(mapToAdminSlot))
    );
  }

  getWeekTimetableTeacherForAdmin(teacherName : string): Observable<AdminSlot[]> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    const url = `${this.apiUrl}/timetable/admin/teacher/${teacherName}`;
    console.log("herere");
    console.log(this.http.get<any[]>(url, { headers }));

    return this.http.get<any[]>(url, { headers }).pipe(
      map(dtos =>
        dtos.map(mapToAdminSlot))
    );
  }
}


// }
