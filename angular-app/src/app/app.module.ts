import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsComponent } from './components/news/news.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditNewsComponent } from './components/edit-news/edit-news.component';
import { IndexComponent } from './components/index/index.component';
import {AuthInterceptorProvider} from "./interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewsComponent,
    LoginComponent,
    RegisterComponent,
    CreateNewsComponent,
    EditNewsComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
