import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AboutComponent } from './profile-page/about/about.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TimelineComponent } from './profile-page/timeline/timeline.component';
import { RegisterComponent } from './register/register.component';
import { PostsFilterComponent } from './world/posts-filter/posts-filter.component';
import { UsersFilterComponent } from './world/users-filter/users-filter.component';
import { WorldComponent } from './world/world.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  
  // Route Guard apartir daqui
  {path: 'newsfeed', component: NewsfeedComponent},

  
  {path: 'world', component: WorldComponent, children: [
    {path: 'users', component: UsersFilterComponent},
    {path: 'posts', component: PostsFilterComponent},
  ]},

  {path: 'profile/:id', component: ProfilePageComponent, children: [
    {path: 'timeline', component: TimelineComponent},
    {path: 'about', component: AboutComponent},
    // {path: 'groups', component: GroupsComponent},
    // {path: 'images', component: ImagesComponent},
  ]},


  // {path: 'my-list', component: MyListComponent},
  

  {path: 'not-found', component: ErrorPageComponent}, // Aqui defino uma nova rota que irá existir.
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'},
   // Aqui digo que se o URL digitado não existir na minha aplicação, então faz o redirecionamento para a rota /not-found

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
