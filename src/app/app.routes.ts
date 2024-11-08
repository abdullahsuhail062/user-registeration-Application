import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [{path: '', component: RegisterationComponent},
     {path: 'dashboard', component: DashboardComponent},];
