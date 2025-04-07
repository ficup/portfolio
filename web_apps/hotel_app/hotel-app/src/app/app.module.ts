import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';

import {provideRouter, RouterOutlet} from '@angular/router'
import {routes} from './app.routes';
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';

import {UserModule} from "./user/user.module";
import {LayoutModule} from "./layout/layout.module";
import {AuthModule} from "./auth/auth.module";
import {AdminModule} from "./admin/admin.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,

    UserModule,
    AdminModule,
    LayoutModule,
    AuthModule,
  ],
  providers: [
    provideRouter(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
