import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  icons = [
    { src: 'assets/icons/dashboard.svg', alt: 'Dashboard' },
    { src: 'assets/icons/team.svg', alt: 'Team' },
  ];

  onIconClick(icon: any) {
    console.log('Clicked icon:', icon.alt);
  }
}
