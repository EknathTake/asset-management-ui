import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent   {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmBoxComponent>) {}
}
