import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeaverequestService } from '../service/leaverequest.service';
import { ILeaveRequest } from '../leave-request/Ileave-request'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import {LeaveTypePipe} from '../dashboard/leaveType.pipe';
import {TokenStorageService} from '../services/token-storage.service';


interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchTerm: string='';
  page = 1;
  pageSize = 4;
  collectionSize: number=0;
  currentRate = 8;
  countries: Country[]=[];
  allCountries: Country[]=[];
  leaveRequests: ILeaveRequest[] = [];
  
  constructor(private http: HttpClient,private _leaverequestService: LeaverequestService, private _router: Router, private tokenStoreage:TokenStorageService) {

   }
 
  ngOnInit(): void {
    this._leaverequestService.getAllLeaveRequest(this.tokenStoreage.getUser()).subscribe(
      (listLeaveRequests) => this.leaveRequests = listLeaveRequests,
      (err) => console.log(err));

      console.log("addfd"+this.tokenStoreage.getUser())
  }


  onSubmit(): void {
    this._router.navigate(['/login']);
  }

}
