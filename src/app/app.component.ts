import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  user: any;
  title = 'CastraBus';
  collapsed = signal(false);

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
  }

  sidenavWidth() : any{
    let width = '0px';
    if(this.showHeader()) {
      width = this.collapsed() ? '65px' : '280px';
    }
    return width;
  }

  showHeader() {
    if (this.auth.getAuthenticate()) {
      return true;
    }
    return false;
  }
}
