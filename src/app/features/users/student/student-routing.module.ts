import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StudentHomeComponent} from "./student-home/student-home.component";
import {StudentDashComponent} from "./student-home/student-dash/student-dash.component";
import {StudentApplyComponent} from "./student-apply/student-apply.component";
import {AuthGuard} from "../../../core/auth/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    component: StudentHomeComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'student' },
  },
  { path: 'apply', component: StudentApplyComponent },
  { path: 'application', component: StudentDashComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class StudentRoutingModule {}
