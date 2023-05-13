import { Component , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { UsernameValidator } from '../username.validator';
import { PasswordMatchValidator } from '../password.validator';

@Component({
  selector: 'app-form-main-info',
  templateUrl: './form-main-info.component.html',
  styleUrls: ['./form-main-info.component.css']
})
export class FormMainInfoComponent{

    public mainInfo:any;

    constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef){}

    ngOnInit(): void {
      this.mainInfo = this.fb.group({
        name: new FormControl('', [Validators.required, Validators.minLength(4), UsernameValidator.forbiddenNamesValidator(["admin","root"])]),
        username: new FormControl('', [Validators.required, Validators.minLength(4)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        // confirmPassword: ['', [Validators.required, Validators.minLength(6), PasswordMatchValidator.matchPasswords('password', 'confirmPassword')]]
      });
    }


    updateView() {
    this.cdr.detectChanges();
  }
  get name() {return this.mainInfo.get("name"); }
  get username() {return this.mainInfo.get("username"); }
  get email() {return this.mainInfo.get("email"); }
  get password() {return this.mainInfo.get("password"); }
  get confirmPassword() {return this.mainInfo.get("password"); }

}
