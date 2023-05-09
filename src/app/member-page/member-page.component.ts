import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent implements OnInit {
  
    isSideNavCollapsed = false;
   


  screenWidth = 0;
 

  
  constructor(private router: Router) { }

  ngOnInit(): void {
 


  }


  //deconex
  logout() {
    localStorage.clear()
    this.router.navigate(['/signin'])
  }


  //sidnave
          onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    }


  }