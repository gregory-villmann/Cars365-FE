import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import { CarDetailComponent } from './car-detail/car-detail.component';
import {MatCardModule} from "@angular/material/card";
import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './add-car/add-car.component'
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {path: 'cars', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'cars/:id', component: CarDetailComponent},
  {path: 'cars-add', component: AddCarComponent},
  {path: 'cars/:id/edit', component: AddCarComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarDetailComponent,
    AddCarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  exports:[RouterModule],
  providers: [MatSnackBarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
