import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent  {
  
  username: any
  email: any
  profilePhoto: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private apiService: ApiServiceService, private router: Router){}

ngOnInit(): void {
  this.apiService.fetchUserProfile().subscribe({next: (data)=>{this.assignUserCredential(data),console.log(data);
  }, error: (error)=>{console.log(error.error);
      this.handleFetchingUserProfile(error)
      
    
  }})
  
}
assignUserCredential(data: any){
  Object.keys(data).forEach((value)=>{
    if (value===data.username) {
      this.username = data.username
      
    }
if (value ===data.email) {
  this.email = data.email
  
}

  })
}

editProfile(){

}

handleFetchingUserProfile(errorMessage: any){
  if (errorMessage.status ===404) {
    console.log(errorMessage.message);

  }
    if (errorMessage.status ===500) {
      console.log(errorMessage.message);
      
      
    }  

}
    logout(){
      this.authService.logout()
    }
    dashboard(){
      this.router.navigate(['/dashboard'])      
    }





}
