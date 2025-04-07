import {Component, inject, Inject, Injectable, LOCALE_ID, OnInit} from '@angular/core';
import {Room, Reservation} from "../../types";
import {HttpClient} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {
  ReservationDatepickerDialogComponent
} from "../../dialogs/reservation-datepicker-dialog/reservation-datepicker-dialog.component";
import {BACKEND_URL} from "../../global";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-add-reservation',
  templateUrl: './user-add-reservation.component.html',
  styleUrls: ['./user-add-reservation.component.css']
})
export class UserAddReservationComponent implements OnInit{
  rooms: Array<Room> = [];
  active_user = 2; // TODO ma być id w zależności od zalogowanego usera
  readonly dialog;
  // reservation_message;
  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string, private router: Router) {
    this.dialog = inject(MatDialog)
    // this.reservation_message = '';
  }

  ngOnInit() {
    this.http.get<any>(BACKEND_URL + '/rooms').subscribe(
      data=> {
        this.rooms = data.content as Room[];
      });
  }
  displayDate(date: Date){
    return formatDate(date.toString(), 'yyyy-MM-dd', this.locale);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }


  addReservation(room_id: Number){

    let dialogRef = this.dialog.open(ReservationDatepickerDialogComponent);

    const sub = dialogRef.componentInstance.onAddNewReservation.subscribe((event)=>{
      const headers = { observe: 'response' };
      const body =  {
        checkin_date: formatDate(event.start_date.toString(), 'yyyy-MM-dd', this.locale),
        checkout_date: formatDate(event.end_date.toString(), 'yyyy-MM-dd', this.locale),
        user_id: this.active_user,
        room_id: room_id,
      }
      this.http.post(BACKEND_URL + '/reservation', body,).subscribe({
        next: (response:any) => {
          console.log(response);
          if(response != null){
            // dialogRef.componentInstance.setWarningMessage("");
            window.alert("Pomyślnie dokonano rezerwacji");
            this.redirectTo('user-add-reservation');
            dialogRef.close();
          }
          else{
            // dialogRef.componentInstance.setWarningMessage("Wybrany termin jest już zajęty.");
            window.alert("Wybrany termin jest już zajęty.");
          }
        },
        error: error => {
          window.alert("Wystąpił błąd podczas dokonywania rezerwacji");
        },
      });
    });
  }
 }
