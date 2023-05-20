import { Component , ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
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
    public myPass:any;
    public myPass2:any;
    public matchPass: boolean | boolean = true;

    constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef){}

    ngOnInit(): void {

      this.mainInfo = this.fb.group({
        name: new FormControl('', [Validators.required, Validators.minLength(4), UsernameValidator.forbiddenNamesValidator(["admin","root"])]),
        username: new FormControl('', [Validators.required, Validators.minLength(4), UsernameValidator.forbiddenNamesValidator(["admin","root"])]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password2: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
    }

    @Output() myEvent = new EventEmitter();
    @Output() matchPassEvent = new EventEmitter();
    @Output() mainInfoData = new EventEmitter();

    updateView() {
    this.cdr.detectChanges();
    this.myEvent.emit(this.mainInfo.valid);
    this.mainInfoData.emit(this.mainInfo);
  }

    checkPasswords(){
      if(this.myPass != this.myPass2)
      {
        this.matchPass = false;
      }else{
        this.matchPass = true;
      }
      this.updateView()
      this.matchPassEvent.emit(this.matchPass);
    }

  get name() {return this.mainInfo.get("name"); }
  get username() {return this.mainInfo.get("username"); }
  get email() {return this.mainInfo.get("email"); }
  get password() {return this.mainInfo.get("password"); }

}
