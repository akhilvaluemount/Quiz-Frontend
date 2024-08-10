import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService, private _router:Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      let user = this.registrationForm.value;
      delete user.confirmPassword;
      // Handle registration logic here
      this._authService.register(user).subscribe(
        (data:any)=>{
          this._router.navigateByUrl('login');
          alert('Registration Success');
          console.log('Registration successful:', this.registrationForm.value);
        },
        (err:any)=>{
          alert('Registration Failed');
        }
      )

    }
  }
}
