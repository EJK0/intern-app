import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {PageService} from "../../features/posts/page.service";
import {ActiveRoute, HeaderService} from "./header.service";
import {StudentService} from "../../features/users/student/student.service";
import {OverlayRef} from "@angular/cdk/overlay";
import {CommentService} from "../../shared/comment/comment.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated!: boolean;
  activeRoutes! : ActiveRoute;
  appType!: string;
  userRole!: string;
  overlayRef!: OverlayRef | null;

  @Output() menuClicked = new EventEmitter<Event>();

  constructor(private authService: AuthService,
              private pageService: PageService,
              private headerService: HeaderService,
              private studentService: StudentService,
              private commentService: CommentService,
              ) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((isLogged) => {
      this.isAuthenticated = !!isLogged;
      if (this.isAuthenticated) {
        this.studentService.appTypeSub.subscribe((appType) => {
          this.appType = appType;
        })

        this.authService.userRole$.subscribe(role => {
          this.userRole = role;
        });
      }
    });
    this.activeRoutes = this.headerService.getRouteStatuses();
    this.headerService.routeStatusChanged.subscribe( () => {
      this.activeRoutes = this.headerService.getRouteStatuses();
    });

  }

  onLogout() {
    this.authService.logout();
    this.pageService.setPageOptionsToDefault();
  }

  onMenuClicked() {
    this.menuClicked.emit()
  }

  open() {
    this.commentService.open(true)
  }

}
