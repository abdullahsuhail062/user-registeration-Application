import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [{path: '', component: RegisterationComponent},{path: 'registeration',component: RegisterationComponent},
     { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },{path: 'login', component: LoginComponent},{ path: '', redirectTo: '/login', pathMatch: 'full' },{ path: '**', redirectTo: '/login' }];
