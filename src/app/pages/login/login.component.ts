import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="text-container">
          <h2 class="text-title">Welcome</h2>
          <h4 class="text-detail">to keep connect with us please login with your personal detail</h4>
      </div>
      <div class="login-container">
        <div class="login-area">
          <h2 class="login-title">Login</h2>
          <form (submit)="onLogin()">
            <input type="text" placeholder="Username" [(ngModel)]="username" [ngModelOptions]="{standalone: true}" required />
            <input type="password" placeholder="Password" [(ngModel)]="password" [ngModelOptions]="{standalone: true}" required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
      width: 100vw;
      height: 100vh;
    }
    .text-container {
      flex: 2;
      background: #3EC2BD;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .text-title {
      font-size: 30px;
      font-weight: 500;
      letter-spacing: 1;
      color: #fff;
      padding-bottom: 20px;
    }
    .text-detail {
      font-size: 16px;
      font-weight: 400;
      color: #fff;
      max-width: 320px;
    }
    .login-container {
      flex: 3;
      margin: auto;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .login-area {
      width: 320px;
    }
    .login-title {
      font-size: 30px;
      font-weight: 500;
      letter-spacing: 1;
      color: #3EC2BD;
      padding-bottom: 30px;
    }
    input {
      display: block;
      width: calc(100% - 40px);
      margin-top: 20px;
      padding: 18px;
      border-radius: 20px;
      border: 0;
      background: #F3F4F6;
      color: #222;
    }
    button {
      width: 100%;
      background: #3EC2BD;
      border-radius: 20px;
      color: white;
      border: none;
      cursor: pointer;
      padding: 14px;
      margin-top: 30px;
    }

    @media (max-width: 768px) {
      .container {
        flex-direction: column;
        height: 100vh;
      }
      .text-container {
        flex: none;
        width: calc(100% - 40px);
        padding: 20px;
        border-bottom-left-radius: 100%;
        border-bottom-right-radius: 100%;
      }
      .text-title {
        font-size: 24px;
      }
      .text-detail {
        font-size: 14px;
      }
      .login-container {
        flex: none;
        width: calc(100% - 40px);
        padding: 20px;
      }
      .login-area {
        width: 90%;
        max-width: 320px;
      }
      input {
        width: calc(100% - 20px);
        padding: 14px;
      }
      button {
        padding: 12px;
      }
    }

  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'admin' && this.password === 'qwe123') {
      alert('Login berhasil!');
      this.router.navigate(['/employee-list']);
    } else {
      alert('Username atau password salah!');
    }
  }
}
