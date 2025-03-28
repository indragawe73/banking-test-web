import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
    
      <div class="detail-area">
        <h2 class="detail-title">Employee Detail</h2>
        <div class="detail-card">
          <p><strong>Username</strong> <br /> {{ employee?.username }}</p>
          <p><strong>First Name</strong> <br />{{ employee?.firstName }}</p>
        </div>
        <div class="detail-card">
          <p><strong>Last Name</strong> <br />{{ employee?.lastName }}</p>
          <p><strong>Email</strong> <br />{{ employee?.email }}</p>
        </div>
        <div class="detail-card">
          <p><strong>Birth Date</strong> <br />{{ employee?.birthDate | date:'yyyy-MM-dd' }}</p>
          <p><strong>Salary</strong> <br />Rp. {{ employee?.basicSalary | number }}</p>
        </div>
        <div class="detail-card">
          <p><strong>Status</strong> <br />{{ employee?.status }}</p>
          <p><strong>Group</strong> <br />{{ employee?.group }}</p>
          <p><strong>Description</strong> <br />{{ employee?.description }}</p>
        </div>
        <button mat-button color="primary" (click)="goBack()">Back</button>
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
    .detail-area {
      width: 600px;
    }
    .detail-card {  
      padding: 20px;
      border-radius: 20px; 
      background: #fff;
      margin-bottom: 20px;
    }
    .detail-title {
      font-size: 30px;
      font-weight: 500;
      color: #3EC2BD;
      padding: 20px;
      text-align: center;
    }
    button {
      background: #3EC2BD;
      color: #fff;
      height: 40px;
      width: 100%;
      padding: 8px 30px;
      border: 0;
      border-radius: 20px;
      cursor: pointer;
    } 
      
    @media (max-width: 768px) {
      .detail-area {
        width: 350px;
      }
      .detail-card {  
        padding: 10px;
        margin-bottom: 10px;
      }
      .detail-title {
        font-size: 20px;
        font-weight: 500;
        padding: 10px;
        text-align: center;
      }
      
    }
  `]
})
export class EmployeeDetailComponent {
  employee: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id === ', id)
    if (id) {
      console.log('localStorage.getItem', JSON.parse(localStorage.getItem('employee_') || '{}'))
      this.employee = JSON.parse(localStorage.getItem('employee_') || '{}');
    }
  }
  
  goBack() {
    this.router.navigate(['/employee-list']);
  }
  
}
