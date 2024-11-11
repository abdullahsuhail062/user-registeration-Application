import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private readonly TOKEN_KEY = 'authToken';
  

  isLoggedIn(): boolean {
    const extrVal = localStorage.getItem(this.TOKEN_KEY)
    console.log(extrVal);
    
    return !!localStorage.getItem(this.TOKEN_KEY); // Check if the token exists
  }


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY); // Clear token on logout
  }

}
