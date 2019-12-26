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

  public assetForm: FormGroup;
  private dialogConfig;
  public message: string;

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
      model: new FormControl('', []),
      ram: new FormControl('', []),
      serialNumber: new FormControl('', []),
      assetTag: new FormControl('', []),
      dateAllocated: new FormControl('', []),
      hostname: new FormControl('', []),
      status: new FormControl('', []),
      dateOfBirth: new FormControl(new Date())
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
  };

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
      status: assetForm.status,
      hostname: assetForm.hostname
    };

    this.assetService.createAsset(asset)
      .subscribe(
        res => this.message = 'Asset entry created successfully',
        error => this.message = 'Error occured while creating Asset entry.'
      );
  };

}
