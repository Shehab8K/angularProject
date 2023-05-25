import { Component } from '@angular/core';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public validMainInfo: boolean | boolean = false;
  public matchPass: boolean | boolean = true;
  public mainInfo:any;
  public errorMsg:any = null;

  constructor(private UserService: UserService, private router: Router){}

  getData(data:any){
    this.validMainInfo = data;
  }

  getMain(data:any){
    this.mainInfo = data;
  }
  matchPassword(match:any){
    this.matchPass = match;
  }

  onSubmit(){
    const formData = this.mainInfo.value;
    console.log(formData);
    this.UserService.Register(formData).subscribe({
      next:()=>{
      this.router.navigate(['/login']);
       },

      error:(err)=>{
        if(err.status = 409 )
        {
          console.log(err);
          this.errorMsg = err.error.message;
        }else{
          console.log("else "+err);

          this.errorMsg = "Registration Failed";
        }
      }
  });
  }
}
