import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './core/header/header.component';
import {AuthInterceptor} from "./core/auth/auth-interceptor";
import {ErrorInterceptor} from "./core/error/error-interceptor";
import { ErrorComponent } from './core/error/error.component';
import {AngularMaterialModule} from "./angular-material.module";
import { ItecComponent } from './features/applications/itec/itec.component';
import {BioModule} from "./features/applications/bio/bio.module";
import {PostsModule} from "./features/posts/posts.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import { ProfileComponent } from './features/users/profile/profile.component';
import { AboutComponent } from './features/about/about.component';
import { HelpComponent } from './features/help/help.component';
import { HomeComponent } from './features/home/home.component';
import {ProfileModule} from "./features/users/profile/profile.module";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    ItecComponent,
    ProfileComponent,
    AboutComponent,
    HelpComponent,
    HomeComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AngularMaterialModule,
        PostsModule,
        ReactiveFormsModule,
        FormsModule,
        BioModule,
        MatSidenavModule,
        ProfileModule,
        MatTooltipModule,
    ],
  // multi: true simply means there can be multi interceptors so don't override any
  // existing interceptors
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  exports: [
    // LinebreakPipe
  ],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
