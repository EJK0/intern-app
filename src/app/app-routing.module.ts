import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./features/posts/post-list/post-list.component";
import {PostCreateComponent} from "./features/posts/post-create/post-create.component";
import {AuthGuard} from "./core/auth/auth.guard";
import {ItecComponent} from "./features/applications/itec/itec.component";
import {BioComponent} from "./features/applications/bio/bio.component";
import {ProfileComponent} from "./features/users/profile/profile.component";
import {AboutComponent} from "./features/about/about.component";
import {SupportComponent} from "./features/support/support.component";
import {HomeComponent} from "./features/home/home.component";
import {HomeGuard} from "./features/home/home.guard";


const routes: Routes = [
  { path: '', canActivate: [AuthGuard, HomeGuard], component: HomeComponent},
  { path: 'bio', canActivate: [AuthGuard], component: BioComponent},
  { path: 'itec', canActivate: [AuthGuard], component: ItecComponent},
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
  { path: 'about', canActivate: [AuthGuard], component: AboutComponent},
  { path: 'support', canActivate: [AuthGuard], component: SupportComponent},
  { path: 'posts', canActivate: [AuthGuard], component: PostListComponent},
  { path: 'posts/create', canActivate: [AuthGuard], component: PostCreateComponent },
  { path: 'posts/edit/:postId', canActivate: [AuthGuard], component: PostCreateComponent },
  // Note: can't use /login or '' since /login is already set as the root for the auth-routing and '' is
  // set as root overall. So we make up a random path and go to auth.module from there.
  // All the routes
  { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule) },
  { path: 'student', canLoad: [AuthGuard], loadChildren: () => import('./features/users/student/student.module').then(m => m.StudentModule) },
  { path: 'coordinator', canLoad: [AuthGuard], loadChildren: () => import('./features/users/coordinator/coordinator.module').then(m => m.CoordinatorModule) },
  { path: 'admin', canLoad: [AuthGuard], loadChildren: () => import('./features/users/admin/admin.module').then(m => m.AdminModule) },
  { path: '**', canActivate: [AuthGuard, HomeGuard], component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
