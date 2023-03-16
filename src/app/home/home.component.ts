import {Component} from '@angular/core';
import {CarService, Car} from "./be.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cars$ = this.service.cars$;

  displayedColumns: string[] = ['make', 'model', 'year', 'mileage', 'price'];
   //router: Router;

  constructor(private service: CarService, private router: Router) {}

  redirectToDetail(car: Car) {
    this.router.navigate(['/cars', car.id], );
  }

}
