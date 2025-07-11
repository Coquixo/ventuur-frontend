import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthStoreService } from '../../services/auth/auth-store';
import { AuthService } from '../../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  // styleUrls: ['./auth.css'], // no need
})
export class AuthComponent {
  email = '';
  password = '';

  constructor(
    private authStore: AuthStoreService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authStore.clearCredentials();
  }

  onSubmit() {
    if (this.email && this.password) {
      this.authService
        .login({ email: this.email, password: this.password })
        .subscribe({
          next: (res) => {
            this.authStore.setCredentials({
              email: this.email,
              //we can save token here if needed
            });
            this.router.navigate(['/productos']);
          },
          error: (err: any) => {
            if (err.status === 401) {
              alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
              return;
            }
            alert(
              'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.'
            );
          },
        });
    }
  }
}
