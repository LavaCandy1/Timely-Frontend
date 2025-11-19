import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SearchState {
  type: 'TEACHER' | 'BATCH' | 'NONE';
  value: string;
  year?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminSearchService {

  // Default state is NONE so the timetable doesn't load anything initially for Admin
  private searchSubject = new BehaviorSubject<SearchState>({ type: 'NONE', value: '' });
  
  public searchState$ = this.searchSubject.asObservable();

  constructor() { }

  /**
   * Updates the current search criteria
   * @param type 'TEACHER' or 'BATCH'
   * @param value The actual name or code (e.g., "Rishi Dutt" or "B4")
   * @param year The academic year (optional)
   */
  updateSearch(type: 'TEACHER' | 'BATCH', value: string, year?: string) {
    console.log(`Search Update: ${type} | Val: ${value} | Year: ${year}`);
    this.searchSubject.next({ type, value, year });
  }
}