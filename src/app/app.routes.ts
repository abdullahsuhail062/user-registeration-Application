import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [{path: '', component: RegisterationComponent},{path: 'registeration',component: RegisterationComponent},
     { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },{path: 'login', component: LoginComponent, canActivate: [loginGuard]},{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },{path: 'user-profile', component: UserProfileComponent},{path: 'app.component', component: AppComponent}];
