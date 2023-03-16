import {Component, OnInit} from '@angular/core';
import {Car, CarService} from "../home/be.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car$:Observable<Car>;

  constructor(private service: CarService, private _route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this._route.snapshot.params['id'];
    this.car$ = this.service.getCar(id);
  }

  redirectToEdit(id: number) {
    this.router.navigate(['cars', id, 'edit']);
  }

  redirectToHome() {
    this.router.navigate(['cars']);
  }
}
