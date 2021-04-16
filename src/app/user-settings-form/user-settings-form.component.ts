import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserSettings } from './shared/user-settings.model';
import { UserSettingsService } from './shared/user-settings.service';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    intefaceStyle: null,
    subscriptionType: null,
    notes: null
  };
  userSettings: UserSettings = { ...this.originalUserSettings };

  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]>;

  constructor(private userSettingsService: UserSettingsService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.userSettingsService.getSubscriptionTypes();
  }

  onHttpError(errorResponse: HttpErrorResponse) {
    console.log('errorResponse: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {

      this.userSettingsService.postData(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error => this.onHttpError(error)
      )
    }
    else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the errors';
    }
  }

  onBlur(field: NgModel) {
    console.log('In onBlur: ', field.valid);
  }

}
