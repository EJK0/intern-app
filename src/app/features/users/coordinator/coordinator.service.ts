import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ApplicationData} from "./application.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getApplications() {
    return this.httpClient.get<{studentApplications: ApplicationData[]}>(environment.apiUrl + 'coordinator/applications')
  }

  getApplication(application: ApplicationData, newTab?: boolean) {
    // TODO will need to change these if IT is added
    if (newTab) {
      const url = this.router.serializeUrl(this.router.createUrlTree(['/bio', {
        studentId: application._id,
        isCoordinator: true,
        studentName: application.name,
        studentEmail: application.email
      }]));
      window.open(url, '_blank');
    } else {
      this.router.navigate(['/bio', {studentId: application._id, isCoordinator: true, studentName: application.name, studentEmail: application.email}]);
    }
  }

  markApplicationNeedsChanges(studentId: string) {
    const appInfo = {
      studentId: studentId
    }
    this.httpClient.post(environment.apiUrl + 'coordinator/flag-application', appInfo).subscribe(value => {
      console.log(value)
    });
  }

  markApplicationApproved(studentId: string) {
    const appInfo = {
      studentId: studentId
    }
    this.httpClient.post(environment.apiUrl + 'coordinator/approve-application', appInfo).subscribe(value => {
      console.log(value)
    });
  }

}

