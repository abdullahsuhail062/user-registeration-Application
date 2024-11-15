import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ApiServiceService } from '../api-service.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  profileInitial: string =''
  email: any
  constructor(private matDialogCong: MatDialogConfig,private router: Router, private authservice: AuthService, private dialog: MatDialog, private apiService: ApiServiceService){}
  ngOnInit(): void {
    this.apiService.fetchUserProfile().subscribe({next: (data)=>{
      this.profileInitial = data.email.charAt(0).toUpperCase(); }}) }
  
  
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
    

    // Set the position to top-right
    this.matDialogCong.position = {
      top: '20px', // Distance from the top
      right: '20px', // Distance from the right
    };

    // Optional: Set a custom width and height
    this.matDialogCong.width = '300px';
    this.matDialogCong.height = 'auto';

    const dialogConfig = this.matDialogCong
    this.apiService.fetchUserProfile().subscribe({next: (userdata)=>{
      this.dialog.open(UserProfileComponent,{dialogConfig, data:{username: userdata.username, email: userdata.email, onLogout: () => this.logout(), onNavigateToDashboard: () => this.dashboard()}})
    }, error: (error)=>{console.log(error.error);
    }})
  
}
}








   
    
  
    
  


