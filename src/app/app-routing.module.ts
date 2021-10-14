import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { InsertComponent } from './insert/insert.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:'', canActivate: [AuthGuard], component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"insert", canActivate: [AuthGuard],component:InsertComponent},
  {path:"list", canActivate: [AuthGuard],component:ListComponent},
  {path:"update/:id", canActivate: [AuthGuard],component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
