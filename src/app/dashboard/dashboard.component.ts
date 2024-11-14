import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from '../api-service.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  profileInitial: string =''
  userdata: any
  constructor(private router: Router, private authservice: AuthService, private dialog: MatDialog, private apiService: ApiServiceService){}
  ngOnInit(): void {
    const email =this.userdata.email  // Replace with the actual user email
    this.profileInitial = email.charAt(0).toUpperCase(); // Get first letter and capitalize
  }
  
  
  logout(){
    this.authservice.logout()
    this.router.navigate(['/login'])
    this.dialog.closeAll()
  }

  dashboard(){
    this.router.navigate(['/dashboard'])
    this.dialog.closeAll()


  }

  openProfileDialog(): void{
    this.apiService.fetchUserProfile().subscribe({next: (userdata)=>{this.userdata = userdata,
      this.dialog.open(UserProfileComponent,{width: '400px', data:{username: userdata.username, email: userdata.email, onLogout: () => this.logout(), onNavigateToDashboard: () => this.dashboard()}})
    }, error: (error)=>{console.log(error.error);
    }})
  }
}







   
    
  
    
  


