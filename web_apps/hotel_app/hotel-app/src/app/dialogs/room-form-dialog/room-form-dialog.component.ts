import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {Room} from "../../types";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NgModel} from "@angular/forms";

export type RoomUnsavedToDatabase = {
  hotel_name?: String,
  city?: String,
  room_number?: String,
  price_per_day?: Number
}

@Component({
  selector: 'app-room-form-dialog',
  templateUrl: './room-form-dialog.component.html',
  styleUrls: ['./room-form-dialog.component.css']
})
export class RoomFormDialogComponent implements OnInit{

  public data: RoomUnsavedToDatabase;
  onConfirmClicked;

  constructor(
    public dialogRef: MatDialogRef<Room>,
    private http: HttpClient
  ) {
    this.data = {};
    this.onConfirmClicked = new EventEmitter();
  }

  ngOnInit() {
  }

  confirmClicked(){
    this.onConfirmClicked.emit(this.data);
  }

}
