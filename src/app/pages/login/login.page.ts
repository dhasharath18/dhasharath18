import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { FormBuilder,Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../providers/auth.service';
import {UtilsService} from '../../providers/utils.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userId;
  loginForm;
  password;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private utils:UtilsService,
    private router: Router,
    private storage: Storage) 
  {
    this.loginForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() { }

  submitLoginForm() {
    this.utils.loadingPresent();
    this.authService.loginUser(this.loginForm.value).subscribe((result) => {
      this.utils.loadingDismiss();
      if (result) {
        if (result.status == "OK") {
          this.storage.set('userid', result.data.userid).then(() => {
            this.storage.set('academic_id', result.data.activeAY).then(() => {
              this.storage.set('data', JSON.stringify(result.data)).then(() => {
                if (result.data.is_pwd_reset == 1) {
                  this.router.navigateByUrl("menu/profile")
                } else {
                  this.router.navigateByUrl('menu/changepassword')
                }
              })
            })
          })
        } else {
          this.utils.presentAlert("Oops", result.error)
        }
      }
    })
  }

}
