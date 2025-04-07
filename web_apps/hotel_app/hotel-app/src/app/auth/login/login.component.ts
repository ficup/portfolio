import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL} from "../../global";
import {Observable} from "rxjs";

export type UserLoginCredentials = {
  "user_name": String,
  "user_password": String
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private model: UserLoginCredentials;
  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
   this.model = {user_name:'',user_password:''};
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login() {

    this.model.user_name = "user";
    this.model.user_password = "password";

    // TODO - o co tu chodzi, że nie mogę po prostu przypisać modelu?
    let request_body = {
      "user_name": this.model.user_name,
      "user_password": this.model.user_password
    }

    let url = BACKEND_URL + '/login';
    this.http.post<Observable<boolean>>(url, request_body).subscribe(isValid => {
      console.log(isValid);
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.model.user_name + ':' + this.model.user_password)
          // btoa('user' + ':' + 'password')
        );
        // this.router.navigate(['']);
      } else {
        alert("Authentication failed.")
      }
    });
  }

  sessionDetails(){
    console.log(sessionStorage);
  }
}
