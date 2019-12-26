import {Component, OnInit} from '@angular/core';
import {UserAuthService} from '../services/userauth.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogedIn: boolean;

  constructor(private userAuth: UserAuthService, private router: Router, private cookieService: CookieService) {
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
  }

  logout() {
    this.userAuth.logout();
    location.href = 'http://localhost:4200/login';
  }


}
