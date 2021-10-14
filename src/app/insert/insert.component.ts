import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../data.service';



@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {




  constructor(private _DataService: DataService) { }



  error: any = "";
  page: any = 1

  pageSize: any = 3;

  datal: any[] = [];




  addForm: FormGroup = new FormGroup({

    nationalityNameAr: new FormControl(null, [Validators.required]),
    nationalityNameEn: new FormControl(null, [Validators.required])

  })

  submitForm(addForm: FormGroup) {
    this.addlist();
    this.addForm.reset();

  }


  addlist() {
    // console.log(this.addForm);
    let data =[ { // data from api
      nationalityNameAr: this.addForm.controls.nationalityNameAr.value,
      nationalityNameEn: this.addForm.controls.nationalityNameEn.value,
    }];

    this._DataService.addUser(data).subscribe((result) => {
      console.log("resulteNote:", result)

    })

  }

  ngOnInit(): void {
  }



}
