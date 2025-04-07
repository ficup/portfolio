import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Reservation, User} from "../../types";
import {HttpClient} from "@angular/common/http";
import {formatDate} from "@angular/common";
import {BACKEND_URL} from "../../global";
import {Router} from "@angular/router";

// type UserExpanded= {
//   user_id: Number,
//   reservations_visible: Boolean,
// }

@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.css']
})
export class AdminManageUsersComponent implements OnInit{
  all_reservations: Array<Array<Reservation>> = [];
  all_users: Array<User> = [];
  expanded_users: Array<Boolean> = [];
  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string,
              private router: Router) {}

  ngOnInit() {

    this.http.get<any>(BACKEND_URL + '/users').subscribe(
      data=> {
        this.all_users = data.content as User[];
        this.all_users.forEach(user=>{
          // this.expanded_users.push({user_id:user.id, reservations_visible:false});
          this.expanded_users[user.id.valueOf()] = false;
        })
      });

  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }

  showHideUserReservations(user_id: Number){
    if(this.expanded_users[user_id.valueOf()]){
      this.expanded_users[user_id.valueOf()] = false;
    }
    else{
      this.expanded_users[user_id.valueOf()] = true;
        this.http.get<any>(BACKEND_URL + '/reservations?user_id=' + user_id ).subscribe(
        data=> {
          this.all_reservations[user_id.valueOf()] = data.content;
        });
        console.log(this.all_reservations);
      }
  }

  displayDate(date: Date){
    return formatDate(date.toString(), 'yyyy-MM-dd', this.locale);
  }

  deleteReservation(id: Number){
    this.http.delete(BACKEND_URL + '/reservation/'+id).subscribe({
      next: data => {
        this.redirectTo('admin-manage-users');

      },
      error: error => {
        window.alert("Wystąpił błąd podczas usuwania rezerwacji");
      }
    });
  }

}
