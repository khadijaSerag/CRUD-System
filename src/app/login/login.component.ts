import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router: Router) { }
  
  error: string = "";
  checked: boolean = true;

  signinForm: FormGroup = new FormGroup({

    username: new FormControl(null,Validators.required),
    password: new FormControl(null, [Validators.required] )

  });


  submitForm(signinForm: FormGroup) {

    console.log(signinForm);
    this.checked = false; //waiting .........


    if (signinForm.valid) {

      this._AuthService.login(signinForm.value).subscribe((Response) => {
        if (Response.access_token) {
         
          localStorage.setItem("currentUser",Response.access_token); // لازمت اللوكل استوريدج ان كل مرة بعمل ريفريش ميطلعوش برة لو هو عامل لوجن فانا بتشيك لو الراجل ده عنده توكين يبقى هو عامل لوجن ومطلعهوش برة
        
          this.checked = true; 

          this._AuthService.savecurrentUserData();
          this._Router.navigate(['/insert']);
        
        }
        else {
          this.error = "this user name isn't right";
          this.checked = true;// back to signin
        }
      })
      
    }

  }

  ngOnInit(): void {
  }

}
