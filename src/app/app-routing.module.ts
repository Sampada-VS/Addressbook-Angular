import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressbookFormComponent } from './components/addressbook-form/addressbook-form.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path:'form',component:AddressbookFormComponent},
  {path:'',component:HomeComponent},
  {path:'form/:id',component:AddressbookFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
