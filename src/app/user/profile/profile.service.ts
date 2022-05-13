import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Profile} from "./profile-model";
import {Subject} from "rxjs";
import {map, publishReplay, refCount} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile!: Profile;

  constructor(private httpClient: HttpClient) { }

  makeInitials(name: string) {
    return name.split(' ').map((n: string) => n.substr(0,1)).join('');
  }

  // TODO need to merge userService and profileService. They're redundant at this point, and I'm leaning towards merging U into P.
  getProfile() {
    this.httpClient.get<{profile: Profile}>(environment.apiUrl + 'profile')
      .pipe(
        map(res => this.profile = res.profile),
        publishReplay(1),
        refCount()
      )
      .subscribe()
  }

  get userProfile() {
    return this.profile;
  }

}
