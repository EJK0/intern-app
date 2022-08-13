import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {StudentService} from "../student.service";
import {BioService} from "../../../applications/bio/bio.service";
import {AppProgressType} from "../../../../shared/models/AppProgressType";

@Component({
  selector: 'app-student-apply',
  templateUrl: './student-apply.component.html',
  styleUrls: ['./student-apply.component.css']
})
export class StudentApplyComponent {
  progressType = AppProgressType;
  disableSelect = new FormControl(false);
  program: string = '';


  constructor(private router: Router,
              private studentService: StudentService,
              private bioService: BioService) { }

  onSubmit() {
    if (this.program.toLowerCase() === 'bio')
    {
      this.studentService.setAppType('bio');
      this.studentService.setAppStatus(this.progressType.NOT_STARTED);
      this.studentService.setAppProgress('0.0');
      this.bioService.initBioApp();
      this.router.navigate(['/bio'])
    }
    else if (this.program.toLowerCase() === 'itec')
    {
      this.studentService.setAppType('itec');
      this.router.navigate(['/itec'])
    }
  }

}
