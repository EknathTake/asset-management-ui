import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Asset} from '../model/asset';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssetService} from '../../services/asset.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  public assetForm: FormGroup;
  public message: string;
  isAllocationDateVisible = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Asset, private assetService: AssetService) {
    this.isAllocationDateVisible = (data.status === 'Allocated');

    this.assetForm = new FormGroup({
      empId: new FormControl('', []),
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
      location: new FormControl('', []),
      costCenter: new FormControl('', []),
      productLine: new FormControl('', []),
      jobRole: new FormControl('', []),
      technology: new FormControl('', []),
      model: new FormControl('', [Validators.required]),
      ram: new FormControl('', [Validators.required]),
      serialNumber: new FormControl('', [Validators.required]),
      assetTag: new FormControl('', [Validators.required]),
      dateAllocated: new FormControl('', []),
      dateOfReturn: new FormControl('', []),
      hostname: new FormControl('', []),
      status: new FormControl('', [Validators.required]),
      remark: new FormControl('', [])
      // address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.assetForm.controls[controlName].hasError(errorName);
  };

  setVisibilityForDate(event) {
    this.isAllocationDateVisible = event.value === 'Allocated';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public createAssetEntry = (assetFormValue) => {
    if (this.assetForm.valid) {
      this.executeAssetCreation(assetFormValue);
    }
  };

  private executeAssetCreation = (assetForm) => {
    const asset: Asset = {
      sNo: 0,
      employee: {
        empId: assetForm.empId,
        firstName: assetForm.firstName,
        lastName: assetForm.lastName,
        location: assetForm.location,
        costCenter: assetForm.costCenter,
        productLine: assetForm.productLine,
        jobRole: assetForm.jobRole,
        technology: assetForm.technology,
      },
      model: assetForm.model,
      ram: assetForm.ram,
      serialNumber: assetForm.serialNumber,
      assetTag: assetForm.assetTag,
      dateAllocated: assetForm.dateAllocated,
      dateOfReturn: assetForm.dateOfReturn,
      status: assetForm.status,
      hostname: assetForm.hostname,
      remark: assetForm.remark
    };

    // this.assetService.createAsset(asset)
    //   .subscribe(
    //     res => this.message = 'Asset entry created successfully',
    //     error => this.message = 'Error occured while creating Asset entry.'
    //   );

    console.log('modified asset: ', assetForm);
  }

}
