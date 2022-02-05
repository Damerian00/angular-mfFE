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
    {src: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGZpbmFuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", desc: "With our custom and innovative technology recieve up to the minute status on your mutual funds."},
    {src: "https://media.istockphoto.com/photos/multiethnic-couple-handshake-with-consultant-at-home-picture-id1319763433?b=1&k=20&m=1319763433&s=170667a&w=0&h=wsPSqHYdRNSlyDK9D_HCUNhJaSYxGiFJjgyGL346rm4=", desc: "Through partnering with us you will recieve more security for your investents"},
    {src: "https://media.istockphoto.com/photos/dollar-seedling-growth-concept-plants-on-bills-in-increase-picture-id1297492947?b=1&k=20&m=1297492947&s=170667a&w=0&h=26w8bgKHTY88XroE4UG1yb-QR_MIqfCQf6QXmXDojc4=", desc: "Watch your investments grow through our guidance."}
  ];

}
