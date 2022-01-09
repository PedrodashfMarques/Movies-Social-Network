import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {

  usersCount: number
  postsCount: number
  commentsCount: number
  likesCount: number
  adminsCount: number
  modsCount: number

  mySubscription: Subscription;

  constructor(private myUserActions: UserActionsService) { }

  ngOnInit(): void {
    this.getAllMetrics();
  }

  getAllMetrics(){
    this.mySubscription = this.myUserActions.getMetrics().subscribe(data => {

      this.usersCount = data["usersCount"][0].totalUsers;
      this.postsCount = data["postsCount"][0].totalPosts;
      this.commentsCount = data["commentsCount"][0].totalComments;
      this.likesCount = data["likesCount"][0].totalLikes;
      this.adminsCount = data["adminsCount"][0].totalAdmins;
      this.modsCount = data["modsCount"][0].totalMods;

    })
  }

  ngOnDestroy(): void {
      this.mySubscription.unsubscribe();
  }

}
