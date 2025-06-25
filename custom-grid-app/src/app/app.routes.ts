import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  // Future: { path: 'edit/:id', component: EditMemberComponent }
  { path: '**', redirectTo: 'dashboard' } // fallback
];
