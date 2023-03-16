import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../home/be.service";

enum State {
  EDIT = "EDIT",
  ADD = "ADD"
}

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})

export class AddCarComponent implements OnInit {

   formFields = {
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
    mileage: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
    price: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
    image: ['', Validators.required],
  };

  carForm: FormGroup;

  state: any;
  existingCarId: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _route: ActivatedRoute,
    private service: CarService,
    public snackBar: MatSnackBar,
  ) {}


  ngOnInit(): void {
    this.carForm = this.fb.group(this.formFields);

    if (this._route.snapshot.routeConfig?.path === 'cars/:id/edit' && this._route.snapshot.params['id'] !== null) {
      this.state = State.EDIT;
      this.existingCarId = this._route.snapshot.params['id'];
      this.service.getCar(this.existingCarId).subscribe( car => {
        this.carForm.patchValue({
          make: car.make,
          model: car.model,
          year: car.year,
          mileage: car.mileage,
          price: car.price,
          image: car.image
        })
      })
    } else {
      this.state = State.ADD;
    }
  }

  onSubmit() {
    if (this.carForm.valid) {
      if (this.state === State.EDIT) {
        this.http
          .put('http://localhost:3000/cars/'+this.existingCarId, this.carForm.value)
          .subscribe(
            (res: any) => {
              this.snackBar.open('Auto uuendatud', '', { duration: 3000, horizontalPosition:"end", verticalPosition: "top" });
              this.router.navigate(['cars', res['id']])
            },
            (error) => {
              this.snackBar.open('Error auto uuendamisel', '', { duration: 3000, horizontalPosition:"end", verticalPosition: "top"  });
            }
          );
      } else if (this.state === State.ADD) {
        this.http
          .post('http://localhost:3000/cars/new', this.carForm.value)
          .subscribe(
            (res: any) => {
              this.snackBar.open('Auto salvestatud', '', { duration: 3000, horizontalPosition:"end", verticalPosition: "top" });
              this.router.navigate(['cars', res['id']])
            },
            (error) => {
              this.snackBar.open('Error auto salvestamiselr', '', { duration: 3000, horizontalPosition:"end", verticalPosition: "top"  });
            }
          );
      }

    }
  }

  deleteCar() {
    if(this.existingCarId && this.state === State.EDIT) {
      this.http
        .delete('http://localhost:3000/cars/'+this.existingCarId)
        .subscribe(
          (res: any) => {
            console.log(res)
            this.snackBar.open('Auto kustutatud', '', { duration: 3000, horizontalPosition:"end", verticalPosition: "top" });
            this.router.navigate(['cars'])
          },
          (error) => {
            this.snackBar.open('Error auto kustutamisel', '', { duration: 3000, horizontalPosition:"end", verticalPosition: "top"  });
          }
        );
    }
  }

  redirectToHome() {
    this.router.navigate(['cars']);
  }

}


