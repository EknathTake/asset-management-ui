import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../shared/model/employee';
import {MatDialog} from '@angular/material';
import {ConfirmBoxComponent} from '../../shared/confirm-box/confirm-box.component';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(public employeeService: EmployeeService, private dialog: MatDialog, ) {
  }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      empId: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      costCenter: new FormControl('', [Validators.required]),
      productLine: new FormControl('', [Validators.required]),
      jobRole: new FormControl('', [Validators.required]),
      technology: new FormControl('', [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  public createEmployeeEntry = (empForm) => {
    if (this.employeeForm.valid) {
      const employee = new Employee();
      employee.empId = empForm.empId;
      employee.firstName = empForm.firstName;
      employee.lastName = empForm.lastName;
      employee.costCenter = empForm.costCenter;
      employee.technology = empForm.technology;
      employee.jobRole = empForm.jobRole;
      employee.productLine = empForm.productLine;
      employee.location = empForm.location;

      this.employeeService.addEmployee(employee).subscribe(response => {
        this.dialog.open(ConfirmBoxComponent, {
          width: '40%%',
          data: {
            title: 'Success',
            message: 'Employee Stored Successfully!'
          }
        });
      }, error => {
        this.dialog.open(ConfirmBoxComponent, {
          width: '40%%',
          data: {
            title: 'Error',
            message: 'Error orrured: ' + error
          }
        });
      });
    }
  }
}
