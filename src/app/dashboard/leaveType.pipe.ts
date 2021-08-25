import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'leaveType'})
export class LeaveTypePipe implements PipeTransform {
  transform(value: number): string {
      if(value==1)
      {
          return "Annual Leave";
      }
      if(value==2)
      {
          return "Sick Leave";
      }
      return "Sick Leave";
  }
}