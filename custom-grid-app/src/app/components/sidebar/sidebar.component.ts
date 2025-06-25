import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports:[CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  icons = [
    { src: 'assets/icons/dashboard.svg', alt: 'Dashboard' },
    { src: 'assets/icons/team.svg', alt: 'Team' },
    // Add other icons as needed
  ];

  onIconClick(icon: any) {
    console.log('Clicked icon:', icon.alt);
  }
}
