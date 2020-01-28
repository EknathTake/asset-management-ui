import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Asset} from '../../shared/model/asset';
import {AssetService} from '../../services/asset.service';
import {ConfirmBoxComponent} from '../../shared/confirm-box/confirm-box.component';

@Component({
  selector: 'app-asset-entry',
  templateUrl: './asset-entry.component.html',
  styleUrls: ['./asset-entry.component.scss']
})
export class AssetEntryComponent implements OnInit {
  public assetForm: FormGroup;
  private dialogConfig;
  public isUnderWarranty = false;
  public isDamaged = false;
  public isRepaired = false;


  constructor(private dialog: MatDialog, private assetService: AssetService) {
  }

  ngOnInit() {
    this.assetForm = new FormGroup({
      model: new FormControl('', [Validators.required]),
      ram: new FormControl('', [Validators.required]),
      serialNumber: new FormControl('', [Validators.required]),
      assetTag: new FormControl('', [Validators.required]),
      dateOfPurchase: new FormControl('', [Validators.required]),
      isUnderWarranty: new FormControl('', [Validators.required]),
      isDamaged: new FormControl('', [Validators.required]),
      isRepaired: new FormControl('', [Validators.required])
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
      model: assetForm.model,
      ram: assetForm.ram,
      serialNumber: assetForm.serialNumber,
      assetTag: assetForm.assetTag,
      hostname: assetForm.hostname,
      dateOfPurchase: assetForm.dateOfPurchase,
      isDamaged: this.isDamaged,
      isRepaired: this.isRepaired,
      isUnderWarranty: this.isUnderWarranty
    };

    this.assetService.createAsset(asset)
      .subscribe(
        res => {
          this.dialog.open(ConfirmBoxComponent, {
            width: '40%%',
            data: {
              title: 'Success',
              message: 'Asset entry created successfully!'
            }
          });
        },
        error => {
          this.dialog.open(ConfirmBoxComponent, {
            width: '40%%',
            data: {
              title: 'Error',
              message: 'Error occured while creating Asset entry: ' + error
            }
          });
        }
      );
  }
}
