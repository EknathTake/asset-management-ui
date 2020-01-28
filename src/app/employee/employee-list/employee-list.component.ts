import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = [
    'empId',
    'fullName', 'location',
    'costCenter', 'productLine', 'jobRole', 'technology', 'action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public empService: EmployeeService) { }

  ngOnInit() {

    this.empService.getAllEmployeesDetails().subscribe(response => {
      this.dataSource = new MatTableDataSource<any>(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: any) {
    if (filterValue) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }
}
