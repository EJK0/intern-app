import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DATA_TOKEN} from "./comment.service";

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        OverlayModule,
      ],
      declarations: [ CommentComponent ],
      providers: [
        { provide: DATA_TOKEN, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
