import { TestBed } from '@angular/core/testing';

import { CoordinatorResolver } from './coordinator.resolver';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('CoordinatorResolver', () => {
  let resolver: CoordinatorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    });
    resolver = TestBed.inject(CoordinatorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
