import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FooterComponent } from './footer/footer.component';
import { MyListComponent } from './my-list/my-list.component';
import { moviesService } from './movies.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrailerModalComponent } from './shared/trailer-modal/trailer-modal.component';
import { SafePipe } from './shared/safe.pipe';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AboutComponent } from './profile-page/about/about.component';
import { GroupsComponent } from './profile-page/groups/groups.component';
import { ImagesComponent } from './profile-page/images/images.component';
import { TimelineComponent } from './profile-page/timeline/timeline.component';
import { WorldComponent } from './world/world.component';
import { UsersFilterComponent } from './world/users-filter/users-filter.component';
import { PostsFilterComponent } from './world/posts-filter/posts-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieDetailComponent,
    FooterComponent,
    MyListComponent,
    ErrorPageComponent,
    TrailerModalComponent,
    SafePipe,
    RegisterComponent,
    LoginComponent,
    NewsfeedComponent,
    ProfilePageComponent,
    AboutComponent,
    GroupsComponent,
    ImagesComponent,
    TimelineComponent,
    WorldComponent,
    UsersFilterComponent,
    PostsFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [moviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
