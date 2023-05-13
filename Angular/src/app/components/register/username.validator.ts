import { AbstractControl, ValidatorFn } from '@angular/forms';

export class UsernameValidator {

  static forbiddenNamesValidator(forbiddenUsernames: string[] = []): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (forbiddenUsernames.includes(control.value?.toLowerCase())) {
        return {'forbiddenUsername': {value: control.value}};
      }
      return null;
    };
  }
}
