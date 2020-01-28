import {Component, OnInit, ViewChild} from '@angular/core';
import {AssetService} from '../../services/asset.service';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ExcelData} from '../../shared/model/excel-data';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {AssetHistoryService} from '../../services/asset-history.service';
import {AssetHistoryResponse} from '../../shared/model/asset-history-response';

@Component({
  selector: 'app-asset-history',
  templateUrl: './asset-history.component.html',
  styleUrls: ['./asset-history.component.scss']
})
export class AssetHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'sNo',
    'assetTag',
    'model', 'ram', 'serialNumber',
    'empId', 'name', 'dateAllocated', 'dateOfReturned', 'status', 'action'];

  dataSource: MatTableDataSource<any>;
  assetResponse: ExcelData[] = [];
  statuses = new Set();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private assetService: AssetService,
              private assetServiceHistory: AssetHistoryService,
              public datepipe: DatePipe,
              public router: Router) {
    router.events.subscribe(value => this.getAssetDetails());
  }

  ngOnInit(): void {

  }

  applyFilter(filterValue: any) {
    if (filterValue) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }

  getAssetDetails() {
    this.assetServiceHistory.getAllAssetHistory().subscribe(response => {
      const res = response as AssetHistoryResponse;
      let cnt = 1;
      res.data.forEach(value => {
        const excelData = new ExcelData();
        excelData.sNo = cnt++;
        if (value.employee) {
          excelData.empId = value.employee.empId;
          excelData.name = value.employee.firstName + ' ' + value.employee.lastName;
        }

        excelData.model = value.asset.model;
        excelData.ram = value.asset.ram;
        excelData.serialNumber = value.asset.serialNumber;
        excelData.assetTag = value.asset.assetTag;
        excelData.dateAllocated = this.datepipe.transform(value.dateOfAllocated, 'dd/MM/yyyy');
        excelData.dateReturned = this.datepipe.transform(value.dateOfReturn, 'dd/MM/yyyy');
        excelData.status = value.status;
        excelData.remark = value.remark;

        excelData.dateOfPurchase = value.asset.dateOfPurchase;
        excelData.isDamaged = value.asset.isDamaged;
        excelData.isRepaired = value.asset.isRepaired;
        excelData.isUnderWarranty = value.asset.isUnderWarranty;
        this.assetResponse.push(excelData);
      });
      this.dataSource = new MatTableDataSource<any>(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  exportToExcel() {

  }
}


