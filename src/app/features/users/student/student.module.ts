import {NgModule} from "@angular/core";
import {AngularMaterialModule} from "../../../angular-material.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { StudentHomeComponent } from "./student-home/student-home.component";
import { StudentDashComponent } from './student-home/student-dash/student-dash.component';
import {StudentRoutingModule} from "./student-routing.module";
import {MatSelectModule} from "@angular/material/select";
import {StudentApplyComponent} from "./student-apply/student-apply.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatBadgeModule} from "@angular/material/badge";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BioModule} from "../../applications/bio/bio.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AnnouncementsModule} from "../../announcements/announcements.module";
import {ProfileModule} from "../profile/profile.module";

@NgModule({
  declarations: [
    StudentHomeComponent,
    StudentDashComponent,
    StudentApplyComponent
  ],
  exports: [
    StudentDashComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    StudentRoutingModule,
    MatSelectModule,
    MatGridListModule,
    MatBadgeModule,
    MatStepperModule,
    MatTooltipModule,
    BioModule,
    MatCheckboxModule,
    AnnouncementsModule,
    ProfileModule,
  ]
})
export class StudentModule {}
