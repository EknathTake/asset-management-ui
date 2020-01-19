import {Component, OnInit, ViewChild} from '@angular/core';
import {AssetService} from '../../services/asset.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Asset} from '../../shared/model/asset';
import {Router} from '@angular/router';
import {ConfirmService} from '../../services/confirm.service';
import {AssetResponse} from '../../shared/model/asset-response';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {

  displayedColumns: string[] = [
    'assetTag',
    'model', 'ram', 'serialNumber',
    'dateOfPurchase', 'isUnderWarranty', 'isDamaged', 'isRepaired', 'status'];

  dataSource: MatTableDataSource<any>;
  newAssetDetails: Asset;
  selectedAssetToAssign: Asset;
  idColumn = 'sNo';
  private dsData: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  selection = new SelectionModel<Asset>(false, []);

  constructor(private assetService: AssetService,
              public dialog: MatDialog,
              public router: Router,
              public confirmService: ConfirmService) {
    this.getAssetDetails();
  }

  ngOnInit(): void {
    this.getAssetDetails();
  }

  applyFilter(filterValue: any) {
    if (filterValue) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }

  getAssetDetails() {
    this.assetService.getAllAsset().subscribe(response => {
      const res = response as AssetResponse;
      this.dataSource = new MatTableDataSource<any>(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editRecord(element: any): void {
    const record = this.dataSource.data.find(obj => obj[this.idColumn] === element.sno);
    if (record) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '100%',
        data: element
      });

      dialogRef.afterClosed().subscribe(result => {
        this.newAssetDetails = result;
        this.assetService.updateAsset(element).subscribe(response => {
          console.log('after update: ', response);
        }, error => console.error(error));
      });
    }
  }

  public deleteRecord(recordId) {
    // For delete confirm dialog in deleteItem to match the db column name to fetch.
    const name2 = 'model';
    const record = this.dataSource.data.find(obj => obj[this.idColumn] === recordId);
    const name = 'Delete Asset' + record[name2] + '?';

    // Call the confirm dialog component
    this.confirmService.confirm(name, 'This action is final. Gone forever!').pipe(
      switchMap(res => {
        if (res === true) {
          return this.assetService.removeAssetWithId(recordId);
        }
      }))
      .subscribe(
        result => {
          // Refresh DataTable to remove row.
          this.deleteRowDataTable(recordId, this.idColumn, this.paginator, this.dataSource);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
        }
      );
  }

  // Remove the deleted row from the data table. Need to remove from the downloaded data first.
  private deleteRowDataTable(recordId, idColumn, paginator, dataSource) {
    this.dsData = dataSource.data;
    const itemIndex = this.dsData.findIndex(obj => obj[idColumn] === recordId);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }

  assignAsset() {
    this.selection.selected.forEach(ss => this.selectedAssetToAssign = ss);
    if (this.selectedAssetToAssign) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '80%%',
        data: this.selectedAssetToAssign
      });
    } else {
      window.alert('Select asset first!');
    }
  }
}


