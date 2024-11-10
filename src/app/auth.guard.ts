import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = localStorage.getItem('authTodken'); // Check for token in local storage

  if (token) {
    return true; // Allow access if token exists
  } else {
    router.navigate(['/dashboard']); // Redirect to login if no token
    return false;
}
}
