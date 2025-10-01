import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth/auth'; // Adjust the path as needed

@Component({
  selector: 'app-signup',
  // standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class Signup {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    // Initialize the signup form
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    this.errorMessage = null;
    this.loading = true;

    // Call your signup API
    this.authService.signup(this.signupForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err || 'Signup failed. Please try again.';
      },
    });

    console.log('Signup form submitted', this.signupForm.value);
  }
}
