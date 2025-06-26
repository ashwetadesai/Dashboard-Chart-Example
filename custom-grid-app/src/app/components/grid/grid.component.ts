import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
// import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-grid',
  imports: [ CommonModule,ReactiveFormsModule],
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
  showModal = false;
  isEdit = false;
  editIndex: number | null = null;
  userForm !: FormGroup;
  constructor(private ApiService: ApiService,private fb: FormBuilder) {}

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

    this.loadForm();
  }

  loadForm(){
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      handle: ['', Validators.required],
      role: ['', Validators.required],
      license_used: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      teams:[[]]
    });
  }


  openAddModal() {
    this.isEdit = false;
    this.userForm.reset();
    this.showModal = true;
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

  // Modal Logic

  openEditModal(index:number): void {
    this.isEdit = true;
    this.editIndex = index;
    const user = this.data[index];
    this.userForm.setValue({
      first_name: user.name.first_name,
      last_name: user.name.last_name,
      handle: user.name.handle,
      role: user.role,
      license_used: user.license_used,
      status: user.status,
      teams:user.teams.map((t:any)=>t.value)
    });
    console.log(user.teams.map((t:any)=>t.value));
    this.showModal = true;
  }


  teamOptions = [
    { value: 'Design', text_color: '#886FCE', background_color: '#F8F5FE' },
    { value: 'Testing', text_color: '#FFB21A', background_color: '#FBF2E1' },
    { value: 'Product', text_color: '#2C5BCC', background_color: '#F1F8FE' },
    { value: 'Marketing', text_color: '#494DCB', background_color: '#EFF4FE' }
  ];

  saveUser(){
    if (this.userForm.invalid) return;
    const formData = this.userForm.value;
    const selectedTeamObjects = this.teamOptions.filter(option =>
      formData.teams.includes(option.value)
    );
    const newUser = {
      id: crypto.randomUUID(),
      name: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        handle: formData.handle
      },
      role: formData.role,
      license_used: formData.license_used,
      status: formData.status,
      teams: selectedTeamObjects
    };

    if (this.isEdit && this.editIndex !== null) {
      this.data[this.editIndex] = { ...this.data[this.editIndex], ...newUser };
      
    } else {
      this.data.unshift(newUser);
      alert('Data Added Successfully..!')
    }
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.userForm.reset();
    this.editIndex = null;
  }

  deleteRow(index: number): void {
    const user = this.data[index];
    const name = this.getFullName(user.name);
    if (confirm(`Are you sure to delete ${name}?`)) {
      this.data.splice(index, 1);
    }
  }
}

