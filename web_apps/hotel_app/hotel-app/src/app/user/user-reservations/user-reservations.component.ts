import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {formatDate} from "@angular/common";

import {Reservation} from "../../types";
import {BACKEND_URL} from "../../global";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit{
  user_reservations: Array<Reservation> = [];
  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string,
              private router: Router) {}

  active_user = 2; // TODO ma być id w zależności od zalogowanego usera

  ngOnInit() {
    this.http.get<any>(BACKEND_URL + '/reservations').subscribe(
      data=> {
        this.user_reservations = data.content as Reservation[];
      });
  }
  displayDate(date: Date){
    return formatDate(date.toString(), 'yyyy-MM-dd', this.locale);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }

  deleteReservation(id: Number|undefined){
    this.http.delete(BACKEND_URL + '/reservation/'+id).subscribe({
      next: data => {
        this.redirectTo('user-reservations');

      },
      error: error => {
        window.alert("Wystąpił błąd podczas usuwania rezerwacji");
      }
    });
  }

}
