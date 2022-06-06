import { TestBed } from '@angular/core/testing';

import { StudentService } from './student.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
