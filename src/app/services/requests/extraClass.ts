import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExtraClassRequest } from '../../models/extraClass-request';
import { Observable } from 'rxjs';
import { Location } from '../../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class ExtraClass {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  // for submitting request
  createExtraClassRequest(requestData: ExtraClassRequest): Observable<String> {
    const token = localStorage.getItem('token');
    const headers = {Authorization: `Bearer ${token}`};
    const url = `${this.apiUrl}/requests/extraClassSubmit`;

    return this.http.post<any>(url, requestData, { headers });
    //return status string, e.g., "Request submitted successfully" or error message

  }

  searchAllRequests(type: string): Observable<ExtraClassRequest[]> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${this.apiUrl}/requests/extraClassRequests/${type}`;
    
    return this.http.get<ExtraClassRequest[]>(url, { headers });

  }

  // searchForLocationOptions() {}

  approveExtraClassRequest(requestId: number, locName: String): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${this.apiUrl}/requests/extraClassRequests/${requestId}/approve?location=${locName}`;

    return this.http.post<any>(url, {}, { headers }); 
  }

  rejectExtraClassRequest(requestId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${this.apiUrl}/requests/extraClassRequests/${requestId}/reject`;

    return this.http.put<any>(url, {}, { headers });
  }

  getAvailableLocations(requestId: number): Observable<Location[]> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${this.apiUrl}/requests/extraClassRequests/${requestId}/availableLocations`;

    return this.http.get<Location[]>(url, { headers });
  }
}
