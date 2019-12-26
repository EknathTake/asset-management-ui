import {Component, OnInit} from '@angular/core';
import {UserAuthService} from '../services/userauth.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AssetDetails} from '../shared/model/asset-details';
import {AssetResponse} from '../shared/model/asset-response';
import {ExcelData} from '../shared/model/excel-data';
import {MatTableDataSource} from '@angular/material';
import {AssetService} from '../services/asset.service';
import {ExcelService} from '../services/excel.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogedIn: boolean;
  assetSummary: AssetDetails[] = [];
  total = 0;
  total4GB = 0;
  total8GB = 0;
  total16GB = 0;
  public assetResponse = new Array();

  constructor(private userAuth: UserAuthService,
              private router: Router, private cookieService: CookieService,
              private assetService: AssetService, private excelService: ExcelService) {
    router.events.subscribe((val) => {

      if (this.userAuth.currentUserValue) {
        this.isLogedIn = true;
      }
    });
  }

  ngOnInit() {
    if (this.userAuth.currentUserValue) {
      this.isLogedIn = true;
    }

    this.assetService.getSummary().subscribe(summary => {
      summary.forEach(ss => {
        this.assetSummary.push(ss.assetDetails);
        this.total += ss.assetDetails.total;
        this.total4GB += ss.assetDetails.ram4GB;
        this.total8GB += ss.assetDetails.ram8GB;
        this.total16GB += ss.assetDetails.ram16GB;
      });

      this.assetSummary.push(new AssetDetails('Total', '', this.total4GB, this.total8GB, this.total16GB, this.total));
    });

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
    });
  }

  logout() {
    this.userAuth.logout();
    location.href = 'http://localhost:4200/login';
  }

  exportToExcel() {
    // this.excelService.exportAsExcelFile(this.assetResponse, 'Enventory_Details');
    this.excelService.toFile(this.assetResponse, this.assetSummary, 'Enventory_Details');
  }

}
