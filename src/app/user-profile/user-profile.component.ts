import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  username: string = ''
  email: string = ''
  profilePhoto: any

  constructor(private apiService: ApiServiceService,){}

ngOnInit(): void {
  this.apiService.fetchUserProfile().subscribe({next: (data)=>{this.assignUserData(data),console.log(data);
  }, error: (error)=>{console.log(error);
  }})
  
}
assignUserData(data: any){
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



}
