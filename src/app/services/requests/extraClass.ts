import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExtraClassRequest } from '../../models/extraClass-request';
import { Observable } from 'rxjs';

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

  searchAllRequests(){
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = `${this.apiUrl}/requests/extraClassRequests`;
    
    return this.http.get<ExtraClassRequest[]>(url, { headers });

  }

  // searchForLocationOptions() {}
}
