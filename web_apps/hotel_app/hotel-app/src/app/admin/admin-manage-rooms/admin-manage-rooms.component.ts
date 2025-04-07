import {Component, inject, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Room} from "../../types";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {RoomFormDialogComponent} from "../../dialogs/room-form-dialog/room-form-dialog.component";
import {BACKEND_URL} from "../../global";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-manage-rooms',
  templateUrl: './admin-manage-rooms.component.html',
  styleUrls: ['./admin-manage-rooms.component.css']
})
export class AdminManageRoomsComponent implements OnInit{

  rooms_admin: Array<Room> = [];
  readonly dialog;

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string,
              private router: Router) {
    this.dialog = inject(MatDialog)
  }

  ngOnInit() {
    this.http.get<any>(BACKEND_URL + '/rooms').subscribe(
      data=> {
        this.rooms_admin = data.content as Room[];
      });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }

  addNewRoom(){
    let dialogRef = this.dialog.open(RoomFormDialogComponent);
    const sub = dialogRef.componentInstance.onConfirmClicked.subscribe((event)=>{
      const headers = { observe: 'response' };
      const body = event;
      this.http.post(BACKEND_URL + '/room', body,).subscribe({
        next: (response:any) => {
          console.log(response);
          if(response != null){
            window.alert("Pomyślnie dodano pokój");
            this.redirectTo('admin-manage-rooms');
          }else{
            window.alert("Wystąpił błąd podczas dodawania pokoju");
            this.redirectTo('admin-manage-rooms');
          }
        },
        error: error => {
          window.alert("Wystąpił błąd podczas dodawania pokoju");
          this.redirectTo('admin-manage-rooms');
        },
      });
    });
  }
  updateRoom(room: Room){
    let dialogRef = this.dialog.open(RoomFormDialogComponent);
    dialogRef.componentInstance.data = room;
    const sub = dialogRef.componentInstance.onConfirmClicked.subscribe((event)=>{
      const headers = { observe: 'response' };
      const body = event;
      this.http.put(BACKEND_URL + '/room/' + room.id, body,).subscribe({
        next: (response:any) => {
          console.log(response);
          if(response != null){
            window.alert("Pomyślnie zaktualizowano pokój");
            this.redirectTo('admin-manage-rooms');
          }else{
            window.alert("Wystąpił błąd podczas aktualizacji pokoju");
            this.redirectTo('admin-manage-rooms');
          }
        },
        error: error => {
          window.alert("Wystąpił błąd podczas aktualizacji pokoju");
          this.redirectTo('admin-manage-rooms');
        },
      });
    });
  }

  deleteRoom(room: Room){
    this.http.delete(BACKEND_URL + '/room/'+room.id).subscribe({
      next: data => {
        this.redirectTo('admin-manage-rooms');;

      },
      error: error => {
        window.alert("Wystąpił błąd podczas usuwania rezerwacji");
        this.redirectTo('admin-manage-rooms');
      }
    });
  }

}
