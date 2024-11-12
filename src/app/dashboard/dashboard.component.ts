import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from '../api-service.service';
UserProfileComponent


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router, private authservice: AuthService, private dialog: MatDialog, private apiService: ApiServiceService){}
  logout(){
    this.authservice.logout()
    this.router.navigate(['/login'])
  }

  dashboard(){
    this.router.navigate(['/dashboard'])
  }

  openProfileDialog(): void{
    this.apiService.fetchUserProfile().subscribe({next: (userdata)=>{
      this.dialog.open(UserProfileComponent,{width: '400px', data:{username: userdata.username, email: userdata.email, onLogout: () => this.logout(), onNavigateToDashboard: () => this.dashboard()}})
    }, error: (error)=>{console.log(error.error);
    }})
  }
}







   
    
  
    
  


