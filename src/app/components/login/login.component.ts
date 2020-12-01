import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms"
import {User} from "src/app/models/user"

import {AuthService} from "src/app/services/auth.service"

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Template Driven Forms : pour petit formulaire
  //reactive forms

  public loginForm: FormGroup

  
  constructor(
    fb: FormBuilder, 
    private as: AuthService, 
    private router: Router) {
    let loginFormControls={
      username: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    }

    this.loginForm = fb.group(loginFormControls)

   }

  ngOnInit(): void {
  }

  get myusername() { return this.loginForm.get('username')}
  get mypassword() { return this.loginForm.get('password')}

  loginUser(){
    console.log(this.loginForm.value)
    let data = this.loginForm.value

    let user = new User(null, null, data.username, data.password)
    console.log(user)
    //envoi vers API register

    this.as.loginUser(user).subscribe(
    (result)=>{
      console.log(result);

      let token = result.token

      localStorage.setItem("mytoken", token)

      this.router.navigateByUrl('/dashboard')
    },
    (error)=>{
      console.log(error);
    }
  )


  }


}
