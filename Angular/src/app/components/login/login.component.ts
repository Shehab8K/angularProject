import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public mainInfo:any;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private UserService: UserService, private router: Router){}

  ngOnInit(): void {
    this.mainInfo = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }


  updateView() {
  this.cdr.detectChanges();
}
get email() {return this.mainInfo.get("email"); }
get password() {return this.mainInfo.get("password"); }


  onSubmit(){
    console.log("Inside login Angular");

    const formData = this.mainInfo.value;
    this.UserService.Login(formData).subscribe({
      next:(res)=>{
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['']);
       }
  });
  }

}
