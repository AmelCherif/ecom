import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms"
import {User} from "src/app/models/user"

import {HttpClient} from "@angular/common/http"

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registerForm: FormGroup

 /// public registerUserAPI = "http://127.0.0.1:8081/api/v1/auth/register" //lien de postman

  constructor(fb: FormBuilder, 
    private as: AuthService,
    private router: Router) {
    let registerFormControls={
      name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    }

    this.registerForm = fb.group(registerFormControls)

   }


  ngOnInit(): void {
  }

  get myname() { return this.registerForm.get('name')}
  get myemail() { return this.registerForm.get('email')}
  get mypassword() { return this.registerForm.get('password')}
  get myconfpassword() { return this.registerForm.get('confirmpassword')}

  registerUser(){
    console.log(this.registerForm.value)
    let data = this.registerForm.value

    let user = new User(null, data.email, data.name, data.password)
    console.log(user)
    //envoi vers API register
    this.as.registerUser(data).subscribe(
      (result)=>{
        console.log(result);
        this.router.navigateByUrl('/dashboard')
      },
      (error)=>{
        console.log(error);
      }
    )

  }

}
