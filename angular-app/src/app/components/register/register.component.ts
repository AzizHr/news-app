import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import Swal from "sweetalert2";
import {RegisterRequest} from "../../models/request/register-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isSubmitted = false;
  errorMessage: string;

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {}


  isFieldValid(field: string, errorType: string): boolean {
    return this.registerForm.get(field)?.hasError(errorType) &&
      (this.registerForm.get(field)?.dirty ||
        this.registerForm.get(field)?.touched || this.isSubmitted);
  }

  onSubmit() {
    const registerRequest: RegisterRequest  = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    this.authService.register(registerRequest).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          title: "Good job!",
          text: data.message,
          icon: "success",
          timer: 1500
        });
        setTimeout(() => {
          this.router.navigateByUrl("/auth/login")
        }, 2000);
      },
      err => {
        console.log(err.error.message);
        this.errorMessage = err.error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: 'Please try again later',
        });
        this.router.navigateByUrl("/auth/register")
      }
    )
    this.isSubmitted = true;
  }

}
