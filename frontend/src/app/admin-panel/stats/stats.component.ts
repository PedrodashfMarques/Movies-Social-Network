import { Component, OnInit } from '@angular/core';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  usersCount: number
  postsCount: number
  commentsCount: number
  likesCount: number
  adminsCount: number
  modsCount: number

  constructor(private myUserActions: UserActionsService) { }

  ngOnInit(): void {
    this.getAllMetrics();
  }

  getAllMetrics(){
    this.myUserActions.getMetrics().subscribe(data => {

      this.usersCount = data["usersCount"][0].totalUsers;
      this.postsCount = data["postsCount"][0].totalPosts;
      this.commentsCount = data["commentsCount"][0].totalComments;
      this.likesCount = data["likesCount"][0].totalLikes;
      this.adminsCount = data["adminsCount"][0].totalAdmins;
      this.modsCount = data["modsCount"][0].totalMods;

    })
  }

}
