import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

export const passwordMatchValidator = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('newPassword')?.value === formGroup.get('confirmPassword')?.value) {
    return null;
  } else {
    return {passwordMismatch: true};
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private isPasswordChanging: boolean = false;
  formGroup: FormGroup = new FormGroup({});

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: passwordMatchValidator})
  }

  get changingPassword() {
    return this.isPasswordChanging;
  }

  set changingPassword(isPasswordChanging: boolean) {
    this.isPasswordChanging = isPasswordChanging;
  }

  changePassword() {
    this.changingPassword = true;
    this.authService.changePassword(this.formGroup?.get('oldPassword')?.value, this.formGroup?.get('confirmPassword')?.value).subscribe(res => {
      this.changingPassword = false;
      this._snackBar.open(res.message, 'OK', {duration: 4500});
      this.formGroup.reset();
    });
  }

  onPasswordInput() {
    if (this.formGroup?.hasError('passwordMismatch')) {
      this.formGroup?.get('confirmPassword')?.setErrors([{
        'passwordMismatch': true
      }]);
    } else {
      this.formGroup?.get('confirmPassword')?.setErrors(null);
    }
  }



}
