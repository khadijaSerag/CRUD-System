import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('currentUser')) {

      this.savecurrentUserData();

    }
  }


  // ..... login data... 

  currentUserData: any = new BehaviorSubject(null);


  login(data: object): Observable<any> {
    return this._HttpClient.post("http://62.67.203.240:81/api/Account/Login?culture=ar", data);
  }

  savecurrentUserData() {
    let encodedToken: any = localStorage.getItem('currentUser');
    // console.log(encodedToken)
    let decodedToken = jwtDecode(encodedToken);
    this.currentUserData.next(decodedToken);
    // console.log(decodedToken)

  }




  //............... headers in list .........
  HttpHeader: any;
  take: any;



  getDataList(page: number, pagesize: any): Observable<any> {
    this.HttpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
    });
    console.log(this.HttpHeader)

    let take = pagesize;
    return this._HttpClient.get(`http://62.67.203.240:81/api/Nationality/GetAll?Take=${take}&Skip=${(page - 1) * take}&Sort[0].field=nationalityId&Sort[0].dir=asc`,
      { headers: this.HttpHeader }
    );
  }

  isloggedin() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    else {
      return false;
    }
  }





}






