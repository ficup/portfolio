import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAboutComponent} from "./user-about/user-about.component";
import {UserAddReservationComponent} from "./user-add-reservation/user-add-reservation.component";
import {UserReservationsComponent} from "./user-reservations/user-reservations.component";

import {HttpClientModule} from "@angular/common/http";

import {MatDialogModule} from "@angular/material/dialog";
import { ReservationDatepickerDialogComponent } from "../dialogs/reservation-datepicker-dialog/reservation-datepicker-dialog.component";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    UserAboutComponent,
    UserAddReservationComponent,
    UserReservationsComponent,
    ReservationDatepickerDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class UserModule { }
