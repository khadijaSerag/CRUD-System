import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public _AuthService:AuthService ,private _Router:Router ) { }

  ngOnInit(): void {
  }

  logout(){
    this._Router.navigate(["/login"]);
    localStorage.removeItem('currentUser');
   
  }

}
