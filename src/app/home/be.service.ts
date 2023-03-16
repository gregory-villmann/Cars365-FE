import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})

export class CarService {
  private baseUrl = 'http://localhost:3000';

  cars$ = this.http.get<Car[]>(`${this.baseUrl}/cars`);

  getCar(id:number){ return this.http.get<Car>(`${this.baseUrl}/cars/${id}`)};


  constructor(private http: HttpClient) {}



}
