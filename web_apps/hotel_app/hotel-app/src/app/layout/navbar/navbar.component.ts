import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // TODO - remove when login is ready
  adminIsActive = true;

  constructor(private router: Router) {
    this.adminIsActive = Boolean(localStorage.getItem("adminIsActive"));

  }

  changeUser(){
    this.adminIsActive = !this.adminIsActive;
    if(this.adminIsActive){
      this.router.navigate(['/admin-manage-users']);
      localStorage.setItem("adminIsActive", String(this.adminIsActive));
    }
    else{
      this.router.navigate(['/user-reservations']);
      localStorage.setItem("adminIsActive", String(this.adminIsActive));
    }
  }

}
