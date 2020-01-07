import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import {ConfirmBoxComponent} from '../shared/confirm-box/confirm-box.component';


@Injectable()
export class ConfirmService {

  private dialogRef: MatDialogRef<ConfirmBoxComponent>;

  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<any> {

    this.dialogRef = this.dialog.open(ConfirmBoxComponent);
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.message = message;

    return this.dialogRef.afterClosed();

  }
}
