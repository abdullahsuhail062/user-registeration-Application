import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private readonly TOKEN_KEY = 'authToken';
  

  isLoggedIn(): boolean {
    const extrVal = localStorage.getItem(this.TOKEN_KEY)    
    return !!localStorage.getItem(this.TOKEN_KEY); // Check if the token exists
  }
  saveToken(token: string): void{
     localStorage.setItem(this.TOKEN_KEY, token)
  }


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY); // Clear token on logout
  }

}
