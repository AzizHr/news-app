import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {AuthRequest} from "../../models/request/auth-request";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isSubmitted = false;
  errorMessage: string;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {}


  isFieldValid(field: string, errorType: string): boolean {
    return this.loginForm.get(field)?.hasError(errorType) &&
      (this.loginForm.get(field)?.dirty ||
        this.loginForm.get(field)?.touched || this.isSubmitted);
  }

  onSubmit() {
    const authRequest: AuthRequest  = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.authService.login(authRequest).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          this.router.navigateByUrl("/news")
        }, 2000);
      },
      err => {
        console.log(err.error.message);
        this.errorMessage = err.error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: this.errorMessage
        });
        this.router.navigateByUrl("/auth/login")
      }
    )
    this.isSubmitted = true;
  }

}
