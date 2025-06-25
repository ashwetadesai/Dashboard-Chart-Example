import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { GridComponent } from '../../grid/grid.component';
import { ChartsComponent } from '../../charts/charts.component';

@Component({
  selector: 'app-dashboard',
  imports:[GridComponent,ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  teamMembers: any[] = [];
  headers: string[] = [];

  constructor(private teamService: ApiService) {}

  ngOnInit(): void {
    this.teamService.fetchTeam().subscribe(data => {
      this.teamMembers = data;
      if (data.length) {
        this.headers = Object.keys(data[0]);
      }
    });

    this.teamService.getTeamData().subscribe(data => {
      this.teamMembers = data;
    });
  }

  confirmDelete(index: number): void {
    const name = this.teamMembers[index]?.name || 'this member';
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      this.teamService.deleteTeamMember(index);
    }
  }

  addRandomMember(): void {
    const random = {
      name: 'New User',
      username: `user${Math.floor(Math.random() * 1000)}`,
      status: 'Customer',
      role: 'Developer',
      licenseUse: 50,
      teams: ['Engineering']
    };
    this.teamService.addTeamMember(random);
  }

  updateMember(index: number): void {
    const updated = {
      ...this.teamMembers[index],
      role: 'Updated Role'
    };
    this.teamService.updateTeamMember(index, updated);
  }
}
