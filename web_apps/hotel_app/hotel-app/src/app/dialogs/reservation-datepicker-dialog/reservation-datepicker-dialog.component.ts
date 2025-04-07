import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, signal} from '@angular/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-reservation-datepicker-dialog',
  templateUrl: './reservation-datepicker-dialog.component.html',
  styleUrls: ['./reservation-datepicker-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationDatepickerDialogComponent {

  start_date: Date | null;
  end_date: Date | null;
  warning_message: String;
  onAddNewReservation;
  constructor() {
    this.start_date = new Date("01-01-1991")
    this.end_date = new Date("01-01-1990");
    this.warning_message = '';
    this.onAddNewReservation = new EventEmitter();
  }
  updateStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.start_date = event.value;
  }

  updateEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.end_date = event.value;
  }
  addReservation(){
    // console.log(this.start_date);
    // console.log(this.end_date);
    if((this.start_date !=null && this.end_date!=null) && (this.start_date<this.end_date) ){
      this.setWarningMessage('');
      let event_payload = {
        start_date: this.start_date,
        end_date: this.end_date,
      }
      this.onAddNewReservation.emit(event_payload);
    }
    else{
      this.setWarningMessage("Niepoprawna data");
    }
  }
  setWarningMessage(warning_message:String){
    this.warning_message = warning_message;
  }

}
