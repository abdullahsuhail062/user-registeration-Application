import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';
UserProfileComponent


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router, private authservice: AuthService, private dialog: MatDialog){}
 
  openProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '400px',
      data: {  }
    });
  }
    
  

}
