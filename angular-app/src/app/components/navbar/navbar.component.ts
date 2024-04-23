import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {UserResponse} from "../../models/response/user-response";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: string;
  loggedInUser: UserResponse;

  public constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userService.user().subscribe(
      user => {
        this.loggedInUser = user;
        console.log(this.loggedInUser);
      }
    )
  }

  logout() {
    this.authService.logout()
    localStorage.removeItem('token')
    window.location.reload();
  }


}
