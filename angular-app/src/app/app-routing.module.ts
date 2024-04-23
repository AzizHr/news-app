import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {NewsComponent} from "./components/news/news.component";
import {CreateNewsComponent} from "./components/create-news/create-news.component";
import {EditNewsComponent} from "./components/edit-news/edit-news.component";
import {IndexComponent} from "./components/index/index.component";
import {NoAuthGuard} from "./guards/no-auth.guard";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: "", component: IndexComponent, canActivate: [NoAuthGuard] },
  { path: "auth/login", component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: "auth/register", component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: "news", component: NewsComponent, canActivate: [AuthGuard] },
  { path: "news/edit/:id", component: EditNewsComponent, canActivate: [AuthGuard] },
  { path: "news/publish", component: CreateNewsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
