import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AltaComponent } from './components/alta/alta.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'alta', component: AltaComponent, canActivate: [LoginGuard] },
  { path: 'contacto', component: ContactoComponent, canActivate: [LoginGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
