import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private API_URL = 'https://01.fy25ey01.64mb.io/';
  private teamData$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  // Fetch from API and store locally
  fetchTeam(): Observable<any> {
    return this.http.get(this.API_URL)
  }

  getTeamData(): Observable<any[]> {
    return this.teamData$.asObservable();
  }

  // Local-only updates
  addTeamMember(member: any): void {
    const current = this.teamData$.getValue();
    this.teamData$.next([...current, member]);
  }

  updateTeamMember(index: number, updated: any): void {
    const current = this.teamData$.getValue();
    current[index] = updated;
    this.teamData$.next([...current]);
  }

  deleteTeamMember(index: number): void {
    const current = this.teamData$.getValue();
    current.splice(index, 1);
    this.teamData$.next([...current]);
  }
}
