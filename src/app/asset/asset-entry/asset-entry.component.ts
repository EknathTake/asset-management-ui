import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Asset} from '../../shared/model/asset';
import {AssetService} from '../../services/asset.service';

@Component({
  selector: 'app-asset-entry',
  templateUrl: './asset-entry.component.html',
  styleUrls: ['./asset-entry.component.scss']
})
export class AssetEntryComponent implements OnInit {
  /** form group*/
  public assetForm: FormGroup;
  private dialogConfig;
  public message: string;
  selectedStatus = 'Allocated';
  isAllocationDateVisible = false;

  constructor(private dialog: MatDialog, private assetService: AssetService) {
  }

  ngOnInit() {
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

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    };
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.assetForm.controls[controlName].hasError(errorName);
  }

  public createAssetEntry = (assetFormValue) => {
    if (this.assetForm.valid) {
      this.executeAssetCreation(assetFormValue);
    }
  }

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

    this.assetService.createAsset(asset)
      .subscribe(
        res => this.message = 'Asset entry created successfully',
        error => this.message = 'Error occured while creating Asset entry.'
      );
  }

  setVisibilityForDate(event) {
    if (this.selectedStatus === 'Allocated') {
      this.isAllocationDateVisible = true;
    } else {
      this.isAllocationDateVisible = false;
    }
  }
}
