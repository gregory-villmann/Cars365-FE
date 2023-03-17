import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import {Car} from "../services/home.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  cars: any[] = [];
  totalCars: number = 0; // have to return length
  pageIndex: number = 0;
  pageSize: number = 16;

  constructor(private http: HttpClient, private router: Router) {
    this.getCars(this.pageIndex, this.pageSize);
  }

  getCars(pageIndex: number, pageSize: number) {
    const url = `http://localhost:3000/cars?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    this.http.get<any>(url).subscribe(res => {
      this.cars = res.cars;
      this.totalCars = res.size;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  }

  onPageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCars(this.pageIndex, this.pageSize);
  }

  Euro = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'Eur',
  });

  redirectToDetail(car: Car) {
    this.router.navigate(['/cars', car.id], );
  }

}
