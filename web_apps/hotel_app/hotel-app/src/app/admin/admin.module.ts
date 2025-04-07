import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManageUsersComponent } from './admin-manage-users/admin-manage-users.component';
import { AdminManageRoomsComponent } from './admin-manage-rooms/admin-manage-rooms.component';
import { AdminManageAboutComponent } from './admin-manage-about/admin-manage-about.component';
import {RoomFormDialogComponent} from "../dialogs/room-form-dialog/room-form-dialog.component";
import {MatInputModule} from "@angular/material/input";

import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog"; // TODO usunąćy jeżeli niepotrzebne

@NgModule({
  declarations: [
    AdminManageUsersComponent,
    AdminManageRoomsComponent,
    AdminManageAboutComponent,
    RoomFormDialogComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,

    FormsModule,
    MatDialogModule
  ]
})
export class AdminModule { }
