import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';

export type SystemHealthState = 'online' | 'offline';

@Injectable({
  providedIn: 'root',
})
export class SystemHealthService {
  private readonly http = inject(HttpClient);
  private readonly healthCheckUrl = `${environment.apiUrl}/auth/health`;

  checkHealth(): Observable<SystemHealthState> {
    console.log('Checking system health...', this.healthCheckUrl);
    return this.http
      .get(this.healthCheckUrl, {
        responseType: 'text',
      })
      .pipe(map(() => 'online' as const));
  }
}
