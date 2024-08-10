import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _router:Router, private _authService:AuthService) {

    if(localStorage.getItem('token')){
      this._router.navigateByUrl('/dashboard');
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Email:', email);
      console.log('Password:', password);
      // Handle login logic here
      this._authService.login(this.loginForm.value).subscribe(
        (data:any)=>{
          localStorage.setItem('token',data.token);
          this._router.navigateByUrl('/dashboard');
        },
        (err:any)=>{
          alert("Login Failed!");
        }
      )
     
    }
  }
}
