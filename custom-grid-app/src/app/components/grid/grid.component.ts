import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
// import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid',
  imports: [ CommonModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  columns: any[] = [];
  data: any[] = [];
  loading = true;
  selectedRows = new Set<string>();
  selectAllChecked = false;
  hover: number = -1;
  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.ApiService.fetchTeam().subscribe({
      next: (res) => {
        this.columns = res.grid_columns || [];
        this.data = res.grid_data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  getFullName(name: any): string {
    return `${name.first_name} ${name.last_name} ${name.handle}`;
  }

  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    this.selectAllChecked = checked;
    this.selectedRows.clear();
    if (checked) {
      this.data.forEach(item => this.selectedRows.add(item.id));
    }
  }

  toggleRowSelection(id: string): void {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
  }

  isSelected(id: string): boolean {
    return this.selectedRows.has(id);
  }

  showEditPopup(row: any): void {
    alert('Edit ' + this.getFullName(row.name));
  }

  deleteRow(index: number): void {
    const user = this.data[index];
    const name = this.getFullName(user.name);
    if (confirm(`Are you sure to delete ${name}?`)) {
      this.data.splice(index, 1);
    }
  }
}
