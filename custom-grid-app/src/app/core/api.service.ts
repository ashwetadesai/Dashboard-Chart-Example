import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private API_URL = 'https://01.fy25ey01.64mb.io/';

  constructor(private http: HttpClient) {}

  getGridData() {
    this.loadingSubject.next(true);
    return this.http.get<any>(this.API_URL).pipe(
      finalize(() => this.loadingSubject.next(false)),
      catchError(err => {
        console.error('API Error:', err);
        return throwError(() => new Error('API fetch failed'));
      })
    );
  }
}
