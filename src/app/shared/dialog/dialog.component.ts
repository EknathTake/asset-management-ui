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

    this.assetForm = new FormGroup({
      assetTag: new FormControl('', []),
      model: new FormControl('', []),
      ram: new FormControl('', []),
      serialNumber: new FormControl('', []),
      dateOfPurchase: new FormControl('', []),
      isUnderWarranty: new FormControl('', []),
      isDamaged: new FormControl('', []),
      isRepaired: new FormControl('', [])

    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.assetForm.controls[controlName].hasError(errorName);
  }

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
  }

  private executeAssetCreation = (assetForm) => {
    const asset: Asset = {
      sNo: 0,
      model: assetForm.model,
      ram: assetForm.ram,
      serialNumber: assetForm.serialNumber,
      assetTag: assetForm.assetTag,
      hostname: assetForm.hostname,
      dateOfPurchase: assetForm.dateOfPurchase,
      isUnderWarranty: assetForm.isUnderWarranty,
      isDamaged: assetForm.isDamaged,
      isRepaired: assetForm.isRepaired
    };

    this.assetService.createAsset(asset)
      .subscribe(
        res => this.message = 'Asset entry update successfully',
        error => this.message = 'Error occured while creating Asset entry.'
      );
    console.log('modified asset: ', assetForm);
  }

}
