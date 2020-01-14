import {Component, OnInit, ViewChild} from '@angular/core';
import {AssetService} from '../../services/asset.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AssetResponse} from '../../shared/model/asset-response';
import {ExcelData} from '../../shared/model/excel-data';
import {AssetDetails} from '../../shared/model/asset-details';
import {DatePipe} from '@angular/common';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {Asset} from '../../shared/model/asset';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {switchMap} from 'rxjs/operators';
import {ConfirmService} from '../../services/confirm.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-history.component.html',
  styleUrls: ['./asset-history.component.scss']
})
export class AssetHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'sNo',
    'assetTag',
    'model', 'ram', 'serialNumber',
    'empId', 'name', 'dateAllocated', 'dateOfReturned',
    'hostname', 'status', 'action'];

  dataSource: MatTableDataSource<any>;
  assetSummary: AssetDetails[] = [];
  total = 0;
  total4GB = 0;
  total8GB = 0;
  total16GB = 0;
  assetResponse: ExcelData[] = [];
  newAssetDetails: Asset;
  statuses = new Set();
  idColumn = 'sno';
  private dsData: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private assetService: AssetService,
              public datepipe: DatePipe,
              public dialog: MatDialog,
              public router: Router,
              public confirmService: ConfirmService) {
    this.getAssetDetails();
  }

  ngOnInit(): void {
    this.assetService.getSummary().subscribe(summary => {
      summary.forEach(ss => {
        this.statuses.add(ss.assetDetails.status);
        this.assetSummary.push(ss.assetDetails);
        this.total += ss.assetDetails.total;
        this.total4GB += ss.assetDetails.ram4GB;
        this.total8GB += ss.assetDetails.ram8GB;
        this.total16GB += ss.assetDetails.ram16GB;
      });

      this.assetSummary.push(new AssetDetails('Total', '', this.total4GB, this.total8GB, this.total16GB, this.total));
    });

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
      let cnt = 1;
      res.data.forEach(value => {
        const excelData = new ExcelData();
        excelData.sNo = cnt++;
        excelData.empId = value.employee.empId;
        excelData.name = value.employee.firstName + ' ' + value.employee.lastName;
        excelData.location = value.employee.location;
        excelData.costCenter = value.employee.costCenter;
        excelData.productLine = value.employee.productLine;
        excelData.jobRole = value.employee.jobRole;
        excelData.technology = value.employee.technology;
        excelData.model = value.model;
        excelData.ram = value.ram;
        excelData.serialNumber = value.serialNumber;
        excelData.assetTag = value.assetTag;
        excelData.dateAllocated = this.datepipe.transform(value.dateAllocated, 'dd/MM/yyyy');
        excelData.dateReturned = this.datepipe.transform(value.dateOfReturn, 'dd/MM/yyyy');
        excelData.hostname = value.hostname;
        excelData.status = value.status;
        excelData.remark = value.remark;
        this.assetResponse.push(excelData);
      });
      this.dataSource = new MatTableDataSource<any>(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editRecord(element: any): void {
    const record = this.dataSource.data.find(obj => obj[this.idColumn] === element.sno);
    if (record) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '37%',
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
}


