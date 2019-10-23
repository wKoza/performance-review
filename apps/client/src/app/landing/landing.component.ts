import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'perf-review-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  routeToEmployee() {
    this.router.navigate(['employee', 2, 'user', 2]); // Only used for testing purposes
  }
}
