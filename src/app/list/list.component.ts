import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
declare var $: any;



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  pageSize: any = 3;
  page: any = 1;
  totalLength: any;
  totalPage: any;



  selectChangeHandler(event: any) {

    this.pageSize = event.target.value;

  }



  datal: any[] = [];

  constructor(private _AuthService: AuthService, private _DataService: DataService, private _Router: Router) {
    this.handlePageChanged(1);
  }

  callData(page: any) {
    this._AuthService.getDataList(page, this.pageSize).subscribe(
      (data) => {
        this.datal = data.data;
        this.totalLength = data.count;

        //  this.totalPage = data.total / data.per_page
        // console.log(this.datal);
        // console.log(this.totalLength);
      },
      (error) => {
        console.log("connection error" + error);
      },
      () => {
        console.log("API finished");
      }
    )
  }


  handlePageChanged(event: any) {
    this.page = event;
    this.callData(this.page);

  }




  // ................. delete button ..............

  rowId: any;

  getId(id: any) {
    // console.log(id)
    this.rowId = id;
  }

  delete() {
    let data = [
      this.rowId
    ]
    this._DataService.deleteData(data).subscribe((result) => {
      // console.log("deleted:", result);

      $("#delete").modal('hide');
      this.callData(this.page);

    });

  }


  //........................ edit note ......................

  update(id:any) {

    this._DataService.getData(id).subscribe((result) => {
      // console.log("getdata:", result);

      this._Router.navigate(['/update',id]);
      
    }
    )}
    


  ngOnInit(): void {

    this.callData(1);
  }

}
