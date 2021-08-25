import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // form: any = {};
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.registerForm.controls;
  }

  constructor(private authService: AuthService,private tokenStorage:TokenStorageService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted=true;
    this.authService.register(this.registerForm.value).subscribe(
      data => {
        this.tokenStorage.saveUserId(data.userId);
        console.log("BB"+ data.userId);
        console.log("AA"+ this.tokenStorage.getUser());
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        console.log("NN"+ err);
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

}