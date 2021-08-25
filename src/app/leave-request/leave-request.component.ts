import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { LeaverequestService } from '../service/leaverequest.service';
import { ILeaveRequest } from '../leave-request/Ileave-request'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service'

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {

  submitted = false;
  leaveTypeList: any = [1, 2]


  constructor(private _leaverequestService: LeaverequestService, private _router: Router, private tokenStorage:TokenStorageService) { }

  leaveRequestForm = new FormGroup({
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    leaveTypeId: new FormControl(Number, [Validators.required]),
    leaveReason: new FormControl('', [Validators.required]),
    EmployeeId: new FormControl('a', [Validators.required])
  });

  get f() {
    return this.leaveRequestForm.controls;
  }


  ngOnInit(): void {
   
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.leaveRequestForm.invalid) {
      console.log('hello');
      return;
    }
    var leaveTypeIdInitial = this.leaveRequestForm.get('leaveTypeId')?.value
    var leaveTypeIdFinal: number=+leaveTypeIdInitial;
    this.leaveRequestForm.patchValue({leaveTypeId:leaveTypeIdFinal, EmployeeId:this.tokenStorage.getUser()});

    console.log(this.leaveRequestForm.value);
    console.log(this.tokenStorage.getUser());

    this._leaverequestService.addLeaveRequest(this.leaveRequestForm.value).subscribe(
      
      () => this._router.navigate(['/dashboard']),
      (err) => console.log(err),
    );
    console.log(JSON.stringify(this.leaveRequestForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.leaveRequestForm.reset();
  }

}
