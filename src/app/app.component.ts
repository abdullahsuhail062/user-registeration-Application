import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService){}
ngOnInit(): void {
  // Sample client-side logic to check token expiration

  // Check on app initialization/resume
  if (!this.isTokenExpired(this.authService.getToken)) {
    this.authService.logout()
    this.router.navigate(['/login'])
  
  }else{this.router.navigate(['/dashboard'])}
  

}


isTokenExpired(token: any) {
  if (!token || typeof token !== 'string') {
    console.error("Token is missing or not a string");
    return true; // Treat missing or invalid token as expired
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const exp = payload.exp * 1000; // Convert expiration time to milliseconds
    return Date.now() >= exp;
  } catch (error) {
    console.error("Failed to parse token:", error);
    return true; // Assume expired if parsing fails
  }
}



}