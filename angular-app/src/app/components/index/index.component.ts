import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  public constructor(private titleService: Title)
  {
    this.titleService.setTitle("Welcome To News App")
  }
}
