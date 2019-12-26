import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenReponse} from '../shared/model/token-reponse';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  baseUrl = 'http://localhost:8999/api/auth';



  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(usernameOrEmail: string, password: string): Observable<TokenReponse> {
    return this.http.post<TokenReponse>(this.baseUrl + '/signin', {
        usernameOrEmail: usernameOrEmail,
        password: password
      });
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
