import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [{path: '', component: RegisterationComponent},{path: 'registeration',component: RegisterationComponent},
     { path: 'dashboard', component: DashboardComponent },{path: 'login', component: LoginComponent, canActivate: [authGuard]},{ path: '', redirectTo: '/login', pathMatch: 'full' },{ path: '**', redirectTo: 'login' },{path: 'user-profile', component: UserProfileComponent}];
