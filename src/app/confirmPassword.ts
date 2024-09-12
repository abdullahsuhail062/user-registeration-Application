import { FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator function to check if passwords match
export const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const formGroup = control as FormGroup;
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  // Check if passwords match
  return password === confirmPassword ? null : { passwordsMismatch: true };
};
