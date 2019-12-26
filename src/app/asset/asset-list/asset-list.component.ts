import {Component, OnInit} from '@angular/core';
import {AssetService} from '../../services/asset.service';
import {MatTableDataSource} from '@angular/material';
import {AssetResponse} from '../../shared/model/asset-response';
import {ExcelService} from '../../services/excel.service';
import {ExcelData} from '../../shared/model/excel-data';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  displayedColumns: string[] = ['sNo',
    'empId',
    'name',
    'location',
    'costCenter',
    'productLine',
    'jobRole',
    'technology',
    'model', 'ram', 'serialNumber',
    'assetTag', 'dateAllocated',
    'hostname', 'status', 'action'];
  dataSource: MatTableDataSource<any>;

  constructor(private assetService: AssetService, private excelService: ExcelService) {
  }

  public assetResponse = new Array();

  ngOnInit(): void {
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
        excelData.dateAllocated = value.dateAllocated;
        excelData.hostname = value.hostname;
        excelData.status = value.status;


        this.assetResponse.push(excelData);
      });
      this.dataSource = new MatTableDataSource<any>(res.data);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportToExcel() {
    this.excelService.exportAsExcelFile(this.assetResponse, 'Enventory_Details');
  }
}


