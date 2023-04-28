import { Component, OnInit } from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit {

    isSideNavCollapsed = false;
  screenWidth = 0;
  constructor() { }

  ngOnInit(): void {
  }
    onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    }
  

}







