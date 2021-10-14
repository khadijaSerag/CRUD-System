import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  take: any;
  HttpHeader: any;

  constructor(public _HttpClient: HttpClient) { }



  addUser(data: any): Observable<any> {

    this.HttpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
    });

    return this._HttpClient.post('http://62.67.203.240:81/api/Nationality/Insert', data,
      { headers: this.HttpHeader });
  }


  // ....... delete
  url: any = "http://62.67.203.240:81/api/Nationality/Delete";

  deleteData(data: object): Observable<any> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
        'Accept': 'application/json'
      }),
      body: data,
    };
    return this._HttpClient.delete<any>(this.url, option);
  }

  // ..........update
  getData(id: any): Observable<any> {

    this.HttpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('currentUser')
    })

    return this._HttpClient.get(`http://62.67.203.240:81/api/Nationality/GetById?id=${id}`,
      { headers: this.HttpHeader }
    );
  }

  updateData(data: any): Observable<any> {

    this.HttpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
        'Accept': 'application/json'
    })

    return this._HttpClient.put(`http://62.67.203.240:81/api/Nationality/Update`,data,
      { headers: this.HttpHeader }
    );
  }


  

}
