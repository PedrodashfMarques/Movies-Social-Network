import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  @ViewChild('commentContent') commentContent: ElementRef;

  @Input() postId;

  connectedUserId: any;

  commentModalAberto: boolean;

  constructor(
    private myAuthService: AuthService,
    private myRouter: Router,
    private myActiveRoute: ActivatedRoute,
    private myUserActions: UserActionsService,
  ) { }

  ngOnInit(): void {
    this.myAuthService.userSubject.subscribe(response => {
      this.connectedUserId = response.userId;
    })

    console.log(this.postId)
  }


  fecharModal(){
    this.closeModal.emit();
  }


  newComment(){
    let commentContent = this.commentContent.nativeElement.value.toLowerCase();

    if(commentContent.length <= 0){
      this.myRouter.navigateByUrl('/post-detail', {skipLocationChange: true})
      .then(() => {
        this.myRouter.navigate(['/post-detail/', this.postId]);
      })

    } else{
      let formData = new FormData();

      formData.append('userId', this.connectedUserId);
      formData.append('postId', this.postId);
      formData.append('content', commentContent);

      this.myUserActions.commentPost(formData).subscribe(response => {
        console.log(response);

        this.myRouter.navigateByUrl('/post-detail', {skipLocationChange: true})
          .then(() => {
            this.myRouter.navigate(['/post-detail/', this.postId]);
          })
        
      });

    }
  }

}
