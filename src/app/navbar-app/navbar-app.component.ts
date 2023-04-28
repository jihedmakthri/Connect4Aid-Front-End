import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-app',
  templateUrl: './navbar-app.component.html',
  styleUrls: ['./navbar-app.component.css']
})
export class NavbarAppComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
      logout() {
    localStorage.clear()
    this.router.navigate(['/signin'])
  }
}
