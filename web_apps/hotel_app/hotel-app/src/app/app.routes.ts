import {Routes} from '@angular/router'
import {UserAboutComponent} from "./user/user-about/user-about.component";
import {UserReservationsComponent} from "./user/user-reservations/user-reservations.component";
import {PageNotFoundComponent} from "./utils/page-not-found/page-not-found.component";
import {UserAddReservationComponent} from "./user/user-add-reservation/user-add-reservation.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AdminManageUsersComponent} from "./admin/admin-manage-users/admin-manage-users.component";
import {AdminManageRoomsComponent} from "./admin/admin-manage-rooms/admin-manage-rooms.component";
import {AdminManageAboutComponent} from "./admin/admin-manage-about/admin-manage-about.component";

export const routes : Routes = [
  {path: 'user-about', component: UserAboutComponent},
  {path: 'user-reservations', component: UserReservationsComponent},
  {path: 'user-add-reservation', component: UserAddReservationComponent},

  {path: 'admin-manage-users', component: AdminManageUsersComponent},
  {path: 'admin-manage-rooms', component: AdminManageRoomsComponent},
  {path: 'admin-manage-about', component: AdminManageAboutComponent},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '', redirectTo: 'user-about', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent}
];
