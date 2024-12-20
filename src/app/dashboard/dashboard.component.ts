import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ApiServiceService } from '../api-service.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  profileInitial: string =''
  email: any
  showWelcomeMessage: boolean = false;
  constructor(private sharedService: SharedService,private router: Router, private authservice: AuthService, private dialog: MatDialog, private apiService: ApiServiceService){}
  ngOnInit(): void {
    this.greetUser()
    this.apiService.fetchUserProfile().subscribe({next: (data)=>{
      this.profileInitial = data.email.charAt(0).toUpperCase(); }})
      this.sharedService.taskTriggered$.subscribe(()=>{this.openDeleteAccountDialog()})
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
  confirmDelete(){
    this.apiService.deleteAccount().subscribe({next:
      (response) => {
        this.authservice.deleteToken()
        this.router.navigate(['/login'])
        this.dialog.closeAll()
        console.log('Account deleted successfully');
        // Perform any necessary clean-up or redirect
      },
     error: (error) => {
        console.log('Error deleting account:', error.error);

      }}
    );
  }

  

  closeAllDialog(){
    this.dialog.closeAll()
  }
 
  openDeleteAccountDialog(){
   const dialogRef= this.dialog.open(DeleteAccountDialogComponent,{position:{right:'0px'},width: '400px',data:{onConfirmDelete: ()=> this.confirmDelete(), onCloseAll: ()=> this.closeAllDialog()}})
      dialogRef.afterClosed().subscribe((result)=>{
        if (result ==='confirm') {
          this.confirmDelete()
         


          
        }
      })
  
  }
   
  
  openProfileDialog(): void{
    const dialogConfig = new MatDialogConfig
    dialogConfig.height = '400px'
    this.apiService.fetchUserProfile().subscribe({next: (userdata)=>{
      this.dialog.open(UserProfileComponent,{position: {top: '55px', right: '0px'},width: '180px', panelClass: 'custom-dialog',data:{username: userdata.username, email: userdata.email, onLogout: () => this.logout(), onNavigateToDashboard: () => this.dashboard(), onOpenDeleteAccountDialog: ()=> this.openDeleteAccountDialog()}})
    }, error: (error)=>{console.log(error.error);
    }})
  
}
  greetUser(){
    const isWelcomed = localStorage.getItem('isWelcomed');
    
    if (isWelcomed === 'false') {
      this.showWelcomeMessage = true; // Show the welcome message
      // Update the flag to avoid showing it again
      localStorage.setItem('isWelcomed', 'true');
    }
  }
  navigateToDoList(){
    this.router.navigate(['/ToDoList'])
  }
}








   
    
  
    
  


