import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Asset} from '../model/asset';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetService} from '../../services/asset.service';
import {Employee} from '../model/employee';
import {EmployeeService} from '../../services/employee.service';
import {AssetHistory} from '../model/asset-history';
import {SelectionModel} from '@angular/cdk/collections';
import {AssetHistoryService} from '../../services/asset-history.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public assetAssignForm: FormGroup;

  public message: string;
  selectedAssetStatus = 'ALLOCATED';
  displayedColumns: string[] = ['empId', 'fullName', 'location', 'costCenter', 'productLine', 'jobRole', 'technology'];

  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selection = new SelectionModel<Employee>(false, []);

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Asset,
    private assetService: AssetService,
    private employeeService: EmployeeService,
    private assetHistoryService: AssetHistoryService) {

    this.assetAssignForm = new FormGroup({
      assetStatus: new FormControl('', [Validators.required]),
      remark: new FormControl('', []),
      dateOfReturn: new FormControl('', []),
      dateOfAllocated: new FormControl('', [])

    });

    this.employeeService.getAllEmployeesDetails().subscribe(ee => {
      this.dataSource = new MatTableDataSource(ee);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.assetAssignForm.controls[controlName].hasError(errorName);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  public assetAssign = (assetFormValue) => {
    debugger;
    if (this.assetAssignForm.valid) {
      this.executeAssetAssigning(assetFormValue);
    }
  }

  private executeAssetAssigning = (assetForm) => {
    let assetHistory: AssetHistory;
    if (this.selectedAssetStatus === 'ALLOCATED') {
      let selectedEmployee;
      this.selection.selected.forEach(selected => selectedEmployee = selected);
      if (selectedEmployee) {
        assetHistory = {
          asset: this.data,
          employee: selectedEmployee,
          status: this.selectedAssetStatus,
          dateOfAllocated: assetForm.dateOfAllocated,
          dateOfReturn: assetForm.dateOfReturn,
          remark: assetForm.remark
        };
      } else {
        window.alert('Please select employee first!');
      }
    } else {
      assetHistory = {
        asset: this.data,
        employee: null,
        status: this.selectedAssetStatus,
        dateOfAllocated: assetForm.dateOfAllocated,
        dateOfReturn: assetForm.dateOfReturn,
        remark: assetForm.remark
      };
    }

    if (assetHistory) {
      this.assetHistoryService.createAsset(assetHistory).subscribe(response => console.log('AsserHistory Response: ', response));
    } else {
      window.alert('unknown error occured, try again!');
    }
  }

  setVibilityForEmployeeList(event: any) {
    this.selectedAssetStatus = event.value;
  }
}
