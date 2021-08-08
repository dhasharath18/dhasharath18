import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl,ValidationErrors } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import {AuthService} from '../../providers/auth.service';
import {UtilsService} from '../../providers/utils.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  chpassword;
  public pswdForm: FormGroup;
  headerData = { title: 'Change Password', year_id: 0 };

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private storage: Storage,
    private router:Router,
    public utils: UtilsService,
    public toastCtrl: ToastController
    ) {
     
  }

  ngOnInit(){
    this.pswdForm=this.fb.group({
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      cnfpassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(4)
      ])
    },
    {
      validators: ChangepasswordPage.confirmed("password","cnfpassword")
    })
  }

  static confirmed = (controlName: string, matchingControlName: string) => {
    return (control: AbstractControl): ValidationErrors | null => {
      const input = control.get(controlName);
      const matchingInput = control.get(matchingControlName);
      if (input === null || matchingInput === null) {
        return null;
      }
      if (matchingInput?.errors && !matchingInput.errors.confirmedValidator) {
        return null;
      }
      if (input.value !== matchingInput.value) {
        matchingInput.setErrors({ confirmedValidator: true });
        return ({ confirmedValidator: true });
      } else {
        matchingInput.setErrors(null);
        return null;
      }
    };
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: 'Password Updated Suceesfully',
      position: 'bottom'
    });
    toast.present();
  }

  submitPassword() {
    this.utils.loadingPresent();
    this.storage.get('userid').then((id)=>{
      delete this.pswdForm.value.cnfpassword;
      this.pswdForm.value.userid=id;
      this.authService.changePassword(this.pswdForm.value).subscribe((result) => {
        this.utils.loadingDismiss();
        if (result.status == 'OK') {
          this.presentToast();
          this.router.navigateByUrl("menu/profile")
        } else if (result.error) {
          this.pswdForm.reset();
          this.utils.presentAlert("Oops!", result.error);
        }
      })
    })
  }

 


}
