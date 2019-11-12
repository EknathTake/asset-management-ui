import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  baseUrl = 'localhost:8080/api/auth';
  loginRequest = {
    usernameOrEmail: '',
    password: ''
  };


  constructor(private http: HttpClient) {
  }

  public login(usernameOrEmail: string, password: string) {
    this.loginRequest.usernameOrEmail = usernameOrEmail;
    this.loginRequest.password = password;
    return this.http.post(this.baseUrl + '/signin', this.loginRequest);
  }
}
