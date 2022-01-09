import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent implements OnInit, OnDestroy {

  @Output() closeModal = new EventEmitter<void>();

  @ViewChild('commentContent') commentContent: ElementRef;

  @Input() postId;

  connectedUserId: any;

  commentModalAberto: boolean;

  private allSubscriptions = new Subscription();

  constructor(
    private myAuthService: AuthService,
    private myRouter: Router,
    private myActiveRoute: ActivatedRoute,
    private myUserActions: UserActionsService,
  ) { }

  ngOnInit(): void {
    this.allSubscriptions.add(this.myAuthService.userSubject.subscribe(response => {
      this.connectedUserId = response.userId;
    }))
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

      this.allSubscriptions.add(this.myUserActions.commentPost(formData).subscribe(response => {
        // console.log(response);
        
        this.myRouter.navigateByUrl('/post-detail', {skipLocationChange: true})
          .then(() => {
            this.myRouter.navigate(['/post-detail/', this.postId]);
          })
        
      }))

    }
  }

  ngOnDestroy(): void {
      this.allSubscriptions.unsubscribe();
  }

}
