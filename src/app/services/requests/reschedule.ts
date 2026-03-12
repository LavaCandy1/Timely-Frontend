import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RescheduleRequest } from '../../models/reschedule-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Reschedule {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  // for submitting request
  createRescheduleRequest(requestData: RescheduleRequest): Observable<String> {
    const token = localStorage.getItem('token');
    const headers = {Authorization: `Bearer ${token}`};
    const url = `${this.apiUrl}/requests/reschedule`;

    return this.http.post<any>(url, requestData, { headers });
    //return status string, e.g., "Request submitted successfully" or error message

  }

  searchAllRequests(){
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${this.apiUrl}/requests/rescheduleRequests`;
    
    return this.http.get<RescheduleRequest[]>(url, { headers });

  }

  // searchForLocationOptions() {}
}
