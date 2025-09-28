import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}
  login(credentials: any) {
    return this.http.post(`${this.authUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Unknown error occurred';

        if (error.status === 401) {
          errorMsg = 'Invalid credentials';
        } else if (error.status === 500) {
          errorMsg = 'Server error: ' + (error.error?.error || error.message);
        }

        console.error('Login error:', errorMsg);

        return throwError(() => errorMsg);
      })
    );
  }
  signup(userInfo: { name: string; email: string; password: string }) {
    return this.http.post(`${this.authUrl}/register`, userInfo);
  }
  logout() {
    localStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch (e) {
      return false;
    }
  }
}
