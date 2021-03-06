import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './admin-auth-guard/admin-auth-guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CommentsComponent } from './admin-panel/comments/comments.component';
import { PostsComponent } from './admin-panel/posts/posts.component';
import { StatsComponent } from './admin-panel/stats/stats.component';
import { UsersComponent } from './admin-panel/users/users.component';
import { AuthGuard } from './auth-guard/auth-guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AboutComponent } from './profile-page/about/about.component';
import { FollowersComponent } from './profile-page/followers/followers.component';
import { FollowingComponent } from './profile-page/following/following.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TimelineComponent } from './profile-page/timeline/timeline.component';
import { RegisterComponent } from './register/register.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { PostsFilterComponent } from './world/posts-filter/posts-filter.component';
import { UsersFilterComponent } from './world/users-filter/users-filter.component';
import { WorldComponent } from './world/world.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  
  // Route Guard apartir daqui
  {path: 'newsfeed', component: NewsfeedComponent, canActivate:[AuthGuard]},
  
  {path: 'world', component: WorldComponent, canActivate:[AuthGuard], children: [
    {path: 'users', component: UsersFilterComponent},
    {path: 'posts', component: PostsFilterComponent},
    // {path: 'posts', component: PostsFilterComponent}
  ]},

  {path: 'profile/:id', component: ProfilePageComponent, canActivate:[AuthGuard], children: [
    {path: 'timeline', component: TimelineComponent},
    {path: 'about', component: AboutComponent},
    {path: 'followers', component: FollowersComponent},
    {path: 'following', component: FollowingComponent},

  ]},

  {path: 'post-detail/:id', component: PostDetailComponent, canActivate:[AuthGuard]},

  {path: 'admin-panel', component: AdminPanelComponent, canActivate:[AdminAuthGuard], children: [
    {path: 'users', component: UsersComponent},
    {path: 'posts', component: PostsComponent},
    {path: 'comments', component: CommentsComponent},
    {path: 'stats', component: StatsComponent},

  ]},


  {path: 'settings', component: UserSettingsComponent, canActivate:[AuthGuard]},


  {path: 'not-found', component: ErrorPageComponent}, // Aqui defino uma nova rota que ir?? existir.
  {path: '**', redirectTo: 'newsfeed', pathMatch: 'full'},
   // Aqui digo que se o URL digitado n??o existir na minha aplica????o, ent??o faz o redirecionamento para a rota /not-found

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
