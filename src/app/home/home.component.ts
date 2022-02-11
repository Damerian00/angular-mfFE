import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public slides = [
    {src: "assets/images/stock3d.jpg", desc: "With our custom and innovative technology recieve up to the minute status on your mutual funds."},
    {src: "assets/images/trust.jpg", desc: "Through partnering with us you will recieve more security for your investents"},
    {src: "assets/images/moneyGrowth.jpg", desc: "Watch your investments grow through our guidance."}
  ];

}
