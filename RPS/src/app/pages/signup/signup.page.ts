import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../services/db/model/user';
import { Error } from '../../../services/db/model/error';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignUpPage {
  
private user: User = {
  email: null,
  password: null,
}

private error: Error = {
  error_msg: '',
  success_msg: '',
}

  constructor(
    private router: Router,
    private auth: AuthService,
    public alertController: AlertController
  ) { }


  signup() {
    this.auth.signup(this.user.email, this.user.password)
    .then((res) => {
      this.error.error_msg = '';
      this.error.success_msg = "Success! Redirecting..."

      setTimeout(() => {
        this.router.navigate(["/login"]);
      }, 3000);

    })
    .catch((err) => {
      this.error.error_msg = err.message;
    });
  }
}
