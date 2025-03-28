import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import employeesData from './employees.json';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="header">
        <div class="title-area">
          <h2 class="header-title">Employee 2025</h2>
          <h4 class="header-text">List of employee in 2025</h4>
        </div>
        <button (click)="logout()">Logout</button>
      </div>

      
      <div class="wrap-action">
      
      <div class="search-container">
        <input placeholder="Search Username" [(ngModel)]="searchUsername" (keyup)="applyFilter()" />
        <input placeholder="Search Email" [(ngModel)]="searchEmail" (keyup)="applyFilter()" />
        </div>
        <div class="action-container">
          <button (click)="addEmployee()">+ Add</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th (click)="sortBy('username')">Username</th>
            <th (click)="sortBy('firstName')">First Name</th>
            <th (click)="sortBy('lastName')">Last Name</th>
            <th (click)="sortBy('email')">Email</th>
            <th (click)="sortBy('birthDate')">Birth Date</th>
            <th (click)="sortBy('basicSalary')">Salary</th>
            <th (click)="sortBy('status')">Status</th>
            <th (click)="sortBy('group')">Group</th>
            <th (click)="sortBy('description')">Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let employee of paginatedEmployees">
            <td>{{ employee.username }}</td>
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.birthDate | date:'yyyy-MM-dd' }}</td>
            <td>Rp. {{ employee.basicSalary | number }}</td>
            <td>{{ employee.status }}</td>
            <td>{{ employee.group }}</td>
            <td>{{ employee.description }}</td>
            <td>
              <button (click)="viewEmployeeDetail(employee)">Detail</button>
              <button class="edit-btn" (click)="editEmployee(employee)">Edit</button>
              <button class="delete-btn" (click)="deleteEmployee(employee)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-area">
        <div class="pagination-controls">
          <label for="pageSize">Show </label>
          <select id="pageSize" [(ngModel)]="pageSize" (change)="updatePagination()">
            <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }}</option>
          </select>
          <span> rows</span>
        </div>
        <div class="pagination">
          <button (click)="prevPage()" [disabled]="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>        
          <button (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>
        </div>
      </div>
      
    </div>
  `,
  styles: [`
    .container { 
      padding: 20px; 
      background: #f4f7fd;
      min-height: calc(100vh - 40px);
    }
    .header { 
      display: flex; 
      justify-content: space-between; 
      margin-bottom: 10px;
    }
    .title-area {
      display: flex;
      flex-direction: column;
    }
    .header-title {
      padding: 0;
      margin: 0;
      font-size: 30px;
    }
    .header-text {
      padding: 0;
      margin: 0;
      font-size: 14px;
      color: #999;
    }
    .header button {
      background: #3EC2BD;
      color: #fff;
      height: 40px;
      padding: 8px 20px;
      border: 0;
      border-radius: 20px;
      cursor: pointer;
    }
    .wrap-action {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-top: 30px;
    }
    .action-container button{ 
      background: #3EC2BD;
      color: #fff;
      height: 40px;
      padding: 8px 20px;
      margin-bottom: 10px;
      border: 0;
      border-radius: 20px;
      cursor: pointer;
    }
    .search-container { 
      margin-bottom: 15px; 
      display: flex; 
      gap: 10px;
      border-radius: 20px; 
    }
    .search-container input {
      border: 0;
      border-radius: 20px; 
      padding: 0 20px;
      border: 1px solid #3EC2BD;
    }
    table { 
      width: 100%; 
      border-collapse: collapse;
      background-color: #fff; 
    }
    thead {
        border-radius: 10px;
    
    }
    tr:nth-child(even){
      background-color: #f2f2f2;
    }
    th, td { 
      border: 0;
      padding: 12px 8px; 
      text-align: left; 
      color: 646670;
    }
    th { 
      background-color: #3EC2BD;
      color: #fff;
      font-weight: 400; 
      cursor: pointer;
      position: relative;
    }
    th:hover {
      background-color: #e0e0e0;
    }
    td button {
      background: #3EC2BD;
      color: #fff;
      height: 40px;
      padding: 8px 20px;
      border: 0;
      border-radius: 20px;
      cursor: pointer;
      margin-right: 5px;
    }
    td .edit-btn {
      background: #F8D210;
    }
    td .delete-btn {
      background: #F51720;
    }
    .pagination-area {
      display: flex; 
      justify-content: space-between; 
      align-items: center;
    }
    .pagination {
      margin-top: 15px; 
      display: flex; 
      justify-content: flex-end; 
      align-items: center;
      gap: 8;
    }
    .pagination button {
      background: #3EC2BD;
      color: #fff;
      height: 40px;
      padding: 8px 20px;
      border: 0;
      border-radius: 20px;
      cursor: pointer;
      margin: 15px;
    }
    .info-container {
      margin-bottom: 10px;
      font-weight: bold;
    }
    @media (max-width: 768px) {
      .container {
        padding: 10px;
      }
      
      .header-title {
        font-size: 16px;
      } 
      .header-text {
        font-size: 11px;
      } 
      .header button {
        width: 100px;
        height: 30px;
        padding: 8px 20px;
      }
      .search-container { 
        display: flex;
        flex-direction: column;
        gap: 5px;
      } 
      .search-container input {
        padding: 10px;
        border: 1px solid #3EC2BD;
      }
      .action-container button{ 
        height: 30px;
        padding: 8px 20px;
      }
      table {
        width: 100%;
        display: block;
        overflow-x: auto;
        white-space: nowrap;
      }
      .pagination-area {
        flex-direction: column;
      }
      .pagination-controls {
        padding: 10px;
      }
      .pagination {
        margin-top: 0; 
        justify-content: space-between;
        width: 100%;
      }
      .pagination button {
        height: 30px;
      } 
      td button {
        height: 30px;
      }
    }
  `]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = employeesData.map(emp => ({
    ...emp,
    birthDate: new Date(emp.birthDate)
  }));
  paginatedEmployees: Employee[] = [];
  searchUsername: string = '';
  searchEmail: string = '';
  currentPage = 1;
  totalPages = 1;
  filteredEmployees: Employee[] = [];
  pageSizeOptions: number[] = [5, 10, 20, 50];
  pageSize: number = 10; 
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';


  constructor(private router: Router) {}

  ngOnInit() {
    const savedState = localStorage.getItem('employeeListState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      this.searchUsername = parsedState.searchUsername;
      this.searchEmail = parsedState.searchEmail;
      this.currentPage = parsedState.currentPage;
      this.pageSize = parsedState.pageSize;
    }
    
    this.applyFilter();
  } 
  
  applyFilter() {
    this.filteredEmployees = this.employees.filter(employee =>
      employee.username.toLowerCase().includes(this.searchUsername.toLowerCase()) &&
      employee.email.toLowerCase().includes(this.searchEmail.toLowerCase())
    );
  
    this.updatePagination();
  }
  
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages) || 1;
    this.paginatedEmployees = this.filteredEmployees.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  
    this.filteredEmployees.sort((a: any, b: any) => {
      let valueA = a[column];
      let valueB = b[column];
  
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
  
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  
    this.updatePagination();
  } 


  addEmployee() {
    this.router.navigate(['/add-employee']);
    localStorage.removeItem('employeeListState');
  }

  editEmployee(employee: Employee) {
    alert(`Editing ${employee.username}`);
  }

  deleteEmployee(employee: Employee) {
    alert(`Deleted ${employee.username}`);
  }

  viewEmployeeDetail(employee: Employee) {
    const listState = {
      searchUsername: this.searchUsername,
      searchEmail: this.searchEmail,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
    };
    
    localStorage.setItem('employeeListState', JSON.stringify(listState));
    localStorage.setItem('employee_', JSON.stringify(employee));
  
    this.router.navigate(['/employee-detail', employee.username]);
  }
  

  logout() {
    this.router.navigate(['/']);
  }
}


interface Employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}