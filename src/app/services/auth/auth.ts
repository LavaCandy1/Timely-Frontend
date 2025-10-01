import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) {      
      console.error('No token found');
      return null;
    }

    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }

  getRole(): any {
    const decoded = this.decodeToken();
    return decoded ? decoded.roles : null;
  }


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
    console.log(userInfo);
    return this.http.post(`${this.authUrl}/register`, userInfo);
  }
  
  logout() {
    localStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }

    const token = localStorage.getItem('token');
    console.log('here');
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
