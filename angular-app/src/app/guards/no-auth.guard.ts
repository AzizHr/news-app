import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor() {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      window.history.back();
      return false;
    } else {
      return true;
    }
  }
}
