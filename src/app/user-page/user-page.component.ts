import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
    isSideNavCollapsed = false;
  screenWidth = 0;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
    logout() {
    localStorage.clear()
    this.router.navigate(['/signin'])
    }
        onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    }

}
