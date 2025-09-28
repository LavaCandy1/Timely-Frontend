import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth/auth'; // Adjust the path as needed

@Component({
  selector: 'app-login',
  standalone: true,
  // Import ReactiveFormsModule for form directives and RouterLink for navigation
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    // Initialize the form in the constructor
    this.loginForm = this.fb.group({
      // Define form controls, their initial values, and validators
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    this.errorMessage = null;
    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err || 'Login failed. Please try again.';
      },
    });

    console.log('Login form submitted', this.loginForm.value);
  }
}
