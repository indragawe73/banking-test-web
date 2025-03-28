import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  template: `
    <div class="container">
      <div class="add-card">

        <h2 class="add-title">Add Employee</h2>

        <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
          <mat-form-field>
            <input matInput placeholder="Username" formControlName="username" required />
            <mat-error *ngIf="employeeForm.get('username')?.invalid">Required</mat-error>
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="Email" formControlName="email" type="email" required />
            <mat-error *ngIf="employeeForm.get('email')?.invalid">Invalid Email</mat-error>
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="Birth Date" formControlName="birthDate" [matDatepicker]="picker" required />
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="employeeForm.get('birthDate')?.invalid">Invalid Date</mat-error>
          </mat-form-field>

          <mat-form-field>
            <input matInput placeholder="Basic Salary" formControlName="basicSalary" type="number" required />
            <mat-error *ngIf="employeeForm.get('basicSalary')?.invalid">Invalid Number</mat-error>
          </mat-form-field>

          <mat-form-field>
            <mat-select placeholder="Group" formControlName="group">
              <mat-option *ngFor="let group of groupList" [value]="group">{{ group }}</mat-option>
            </mat-select>
          </mat-form-field>

          <div class="button-group">
            <button mat-button color="primary" type="submit" [disabled]="employeeForm.invalid">Save</button>
            <button mat-button type="button" (click)="cancel()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container { 
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #f4f7fd;
    }
    .add-card {  
      padding: 40px;
      border-radius: 20px; 
      background: #fff;
      max-width: 400px;     
    }
    .add-title {
      font-size: 30px;
      font-weight: 500;
      letter-spacing: 1;
      color: #3EC2BD;
      padding-bottom: 40px;
      text-align: center;
    }
    mat-form-field { 
      width: 100%;
      border-radius: 20px; 
    }
    .button-group { 
      display: flex; 
      justify-content: flex-end; 
      margin-top: 10px; 
    }
    .button-group button {
      background: #3EC2BD;
      color: #fff;
      height: 40px;
      padding: 8px 30px;
      margin-left: 10px;
      border: 0;
      border-radius: 20px;
      cursor: pointer;
    } 
  `]
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  groupList: string[] = Array.from({ length: 10 }, (_, i) => `Group ${i + 1}`);

  constructor(private fb: FormBuilder, private router: Router) {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required, this.dateValidator]],
      basicSalary: ['', [Validators.required, Validators.min(0)]],
      group: ['', Validators.required]
    });
  }

  dateValidator(control: any) {
    const today = new Date();
    return new Date(control.value) > today ? { invalidDate: true } : null;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Employee Data:', this.employeeForm.value);
      alert('Employee saved!');
      this.router.navigate(['/employee-list']);
    }
  }

  cancel() {
    this.router.navigate(['/employee-list']);
  }
}
