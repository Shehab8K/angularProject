import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public mainInfo:any;
  public errorMsg:any = null;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private UserService: UserService,
    private router: Router,
    private AuthService: AuthService
    ){}

  ngOnInit(): void {
    if (this.AuthService.isLoggedIn())
    {
      this.router.navigate(['/']);
    }
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
    const formData = this.mainInfo.value;
    this.UserService.Login(formData).subscribe({
      next:(res)=>{
      this.AuthService.setToken(res);
      this.router.navigate(['']);
       },
      error:(err)=>{
        console.log(err);
        switch(err.status)
        {
          case 401:
          this.errorMsg = err.error.message;
          break;

          case 404:
          this.errorMsg = err.error.message;
          break;

          case 403:
          this.errorMsg = err.error.message;
          break;

          default:
          this.errorMsg = "Login failed";
          console.log(err);
        }
      }
  });
  }

}
