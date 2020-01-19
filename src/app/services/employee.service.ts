import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../shared/model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl$ = 'http://localhost:8999/api';

  header = new HttpHeaders()
    .append('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }


  getAllEmployeesDetails(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl$ + '/employee', {
      headers: this.header
    });
  }
}
