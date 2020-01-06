import {Component, OnInit, ViewChild} from '@angular/core';
import {AssetService} from '../../services/asset.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AssetResponse} from '../../shared/model/asset-response';
import {ExcelService} from '../../services/excel.service';
import {ExcelData} from '../../shared/model/excel-data';
import {AssetDetails} from '../../shared/model/asset-details';
import {DatePipe} from '@angular/common';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {Asset} from '../../shared/model/asset';
import {Router} from '@angular/router';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  displayedColumns: string[] = [
    'empId',
    'name',
    'jobRole',
    'model', 'ram', 'serialNumber',
    'assetTag', 'dateAllocated', 'dateOfReturned',
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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private assetService: AssetService,
              public datepipe: DatePipe,
              public dialog: MatDialog,
              public router: Router) {
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

  openDialog(element: Asset): void {
    console.log('selected element: ', element);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '37%',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.newAssetDetails = result;
    });
  }

  deleteElement(sequenceNumber: any) {
    this.assetService.removeAssetWithId(sequenceNumber).subscribe(s => {
      this.router.navigateByUrl('/asset/list').then(r => console.log('Inside deleteElement: ', r));
    });
  }
}


