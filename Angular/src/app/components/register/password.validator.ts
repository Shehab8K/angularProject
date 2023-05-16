import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordMatchValidator {

  static matchPasswords(passwordKey: string, confirmPasswordKey: string): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordKey)?.value;
      const confirmPassword = control.get(confirmPasswordKey)?.value;
      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }
}
