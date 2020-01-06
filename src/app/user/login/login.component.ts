import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAuthService} from '../../services/userauth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  errorMessage: string;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userAuth: UserAuthService) {
    // redirect to home if already logged in
    if (this.userAuth.currentUserValue) {
      this.router.navigate(['asset/list']);
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      usernameOrEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  public login = (loginFormValue) => {
    if (this.loginForm.valid) {
      this.userAuth.login(loginFormValue.usernameOrEmail, loginFormValue.password).subscribe(response => {
        // this.cookies.set ('accessToken', response.accessToken);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.userAuth.currentUserSubject.next(response);
        // this.router.navigate(['home']);
        this.router.navigate(['asset/list']);
        // location.href = 'http://localhost:4200/home';
      }, error => {
        this.errorMessage = 'Login failed, try again later.', error;
      });
    }
  }
}

