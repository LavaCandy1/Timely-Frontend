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
  private searchSubject = new BehaviorSubject<SearchState>({ type: 'NONE', value: '' });
  public searchState$ = this.searchSubject.asObservable();

  constructor() { }
  updateSearch(type: 'TEACHER' | 'BATCH', value: string, year?: string) {
    console.log(`Search Update: ${type} | Val: ${value} | Year: ${year}`);
    this.searchSubject.next({ type, value, year });
  }
}