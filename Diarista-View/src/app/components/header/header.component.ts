import { LocalStorageService } from './../../services/local-storage.service';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: string = '';
  id = 0;

  constructor(private loginService: LoginService,
    private router: Router,
    private location: Location,
    private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.isPresent();
    console.log(this.id)
  }

  isPresent(){
    this.user = this.localStorage.get('username')
    this.id = this.localStorage.get('id');
    return this.loginService.isAuthenticated()
  }

  isDiarista(){
    const isDia = String(this.localStorage.get('isDiarista'));
    return isDia === 'true'? true: false;
  }

  logOut(){
    this.loginService.logOut();
    this.user = '';
    this.id = 0;
    this.isPresent();
    this.router.navigateByUrl('');
  }


}
