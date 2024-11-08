import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [{path: '', component: RegisterationComponent},
     {path: 'dashboard', component: DashboardComponent},{path: 'login', component: LoginComponent}];
