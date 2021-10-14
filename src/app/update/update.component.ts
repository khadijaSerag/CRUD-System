import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { DataService } from '../data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private _DataService: DataService, private _Router: Router, public _ActivatedRoute: ActivatedRoute) { }

  error: any = "";
  page: any = 1
  id: any;
  pageSize: any = 3;

  datal: any[] = [];
  // bject=[{}];




  updateForm: FormGroup = new FormGroup({
    nationalityId: new FormControl(null),
    nationalityNameAr: new FormControl(null, [Validators.required]),
    nationalityNameEn: new FormControl(null, [Validators.required]),
    nationalityName: new FormControl(null)

  })

  editForm(updateForm: FormGroup) {
    

    this.updatelist();

    this._Router.navigate(['/list']);
  }


  updatelist() {
   

    // console.log(this.addForm);
    let data = [{ // data from api
      nationalityId : this.id,
      nationalityNameAr: this.updateForm.controls.nationalityNameAr.value,
      nationalityNameEn: this.updateForm.controls.nationalityNameEn.value,
      nationalityName :this.oldUser.nationalityName //++++++
    }];

    

    this._DataService.updateData(data).subscribe((result) => {
      // console.log("resulte1111:", result)

    })
    

  }
oldUser:any;
  ngOnInit(): void {
    // to call object from another component
    this.id = this._ActivatedRoute.snapshot.params['id'];
    console.log(this.id);
   
   this._DataService.getData(this.id).subscribe((result) => {
    // console.log("resulteobject of id:", result)
    this.oldUser = result; //++++++


    //  to call el object from list when click on edit to form input in update
    this.updateForm.controls['nationalityNameAr'].setValue( result.nationalityNameAr);
    this.updateForm.controls['nationalityNameEn'].setValue( result.nationalityNameEn);
                           /** this is error **/
       // this.updateForm.controls.nationalityNameAr.value() = result.nationalityNameAr;
      // result.nationalityNameEn = this.updateForm.controls.nationalityNameEn.value;

  })

   
   
  }

}
