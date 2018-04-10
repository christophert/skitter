import { Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  constructor(private renderer: Renderer2) { 
  }

  ngOnInit() {
  }

}
