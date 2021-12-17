import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  userBio: string;

  constructor( 
    private myUserActions: UserActionsService, 
    private myAuthService: AuthService
    ) { }

  ngOnInit(): void {

    this.myUserActions.allUserData.subscribe(data => {
      let resultadoBigBio = data[0].userData.big_bio

      if(resultadoBigBio.length <= 0){
        this.userBio = "This user did not share anything with us but we are sure he or she is great!!";
      } else {
        this.userBio =  data[0].userData.big_bio;
      }
      
    })


  }
  // Neste ficheiro ts vou ter que ter um método que chama um e vai buscar a informação do user.bigBio por exemplo

}
