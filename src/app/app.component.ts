import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cars365-FE';

  constructor(private router: Router) {
  }

  redirectHome() {
    this.router.navigate(['cars']);
  }

  routeToAddPage() {
    this.router.navigate(['cars-add']);
  }
}
