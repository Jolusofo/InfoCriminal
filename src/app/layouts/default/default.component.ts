import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit() {
    window.screen.width <= 1150? this.sideBarOpen = false : this.sideBarOpen = true;
   }


  sideBarToggler(event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
