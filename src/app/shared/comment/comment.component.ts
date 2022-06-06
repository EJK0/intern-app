import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AsyncSubject, BehaviorSubject, Subject, Subscription} from "rxjs";
import {CommentService, DATA_TOKEN} from "./comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {
  public commentForm: FormGroup = new FormGroup({
    subject: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required)
  });
  private editorSubject: Subject<any> = new AsyncSubject();

  commentSubmitted: boolean = false;
  commentSubmitted$?: Subscription;
  isCommentThread: boolean = true;

  constructor(private commentService: CommentService,
              @Inject(DATA_TOKEN) private data: {isCommentThread: boolean, threadId: string}) { }

  ngOnInit(): void {
    this.isCommentThread = this.data.isCommentThread;
    this.commentSubmitted$ = this.commentService.commentSubmitted.subscribe(val => {
      if (val) {
        this.commentSubmitted = val;
      }
    })
  }

  ngOnDestroy() {
    this.commentSubmitted$?.unsubscribe();
  }

  onSubmit() {
    if (this.isCommentThread) {
      this.commentService.createCommentThread(
        this.commentForm.controls['subject'].value,
        this.commentForm.controls['body'].value)
    } else if (!this.isCommentThread) {
      this.commentService.addComment(
        this.data.threadId,
        this.commentForm.controls['body'].value)
    }
  }

  onCancel() {
    this.commentService.close();
  }

  handleEditorInit(e: any) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }



}
