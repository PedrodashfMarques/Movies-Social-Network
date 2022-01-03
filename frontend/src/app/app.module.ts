import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SafePipe } from './shared/safe.pipe';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AboutComponent } from './profile-page/about/about.component';
import { TimelineComponent } from './profile-page/timeline/timeline.component';
import { WorldComponent } from './world/world.component';
import { UsersFilterComponent } from './world/users-filter/users-filter.component';
import { PostsFilterComponent } from './world/posts-filter/posts-filter.component';
import { AuthService } from './auth-service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { FollowersComponent } from './profile-page/followers/followers.component';
import { FollowingComponent } from './profile-page/following/following.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorPageComponent,
    SafePipe,
    RegisterComponent,
    LoginComponent,
    NewsfeedComponent,
    ProfilePageComponent,
    AboutComponent,
    TimelineComponent,
    WorldComponent,
    UsersFilterComponent,
    PostsFilterComponent,
    FollowersComponent,
    FollowingComponent,
    UserSettingsComponent,
    PostModalComponent,
    PostDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter:  () => localStorage.getItem('access_token')
      }
    })
  ],

  
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
