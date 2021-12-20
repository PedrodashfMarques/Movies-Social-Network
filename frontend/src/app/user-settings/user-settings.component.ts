import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  userInformationForm: FormGroup;
  allCountriesArray: any;
  connectedUserId: any;
  userLocation: string;

  accountCreatedOn;

  // Image Upload

  fileToUpload;

  // Image Upload

  constructor(
    private myFormBuilder: FormBuilder, 
    private myAuthService: AuthService,
    private myRouter: Router,
    private myUserActions: UserActionsService
  ) { }

  ngOnInit(): void {
    // Ter atenção à ordem
    this.myAuthService.autologin();
    this.updateUserForm();

    this.myAuthService.userSubject.subscribe(data => {
      this.connectedUserId = data.userId;

      // this.accountCreatedOn = data[0].userData.created_at;

      // console.log(data)
    })

    this.myUserActions.getUserData(this.connectedUserId).subscribe(data => {
      this.userInformationForm.controls.smallBio.setValue(data[0].userData.small_bio);
      this.userInformationForm.controls.bigBio.setValue(data[0].userData.big_bio);
      this.userInformationForm.controls.location.setValue(data[0].userData.location);
      this.userInformationForm.controls.userImage.setValue(data[0].userData.user_image);
      this.userInformationForm.controls.bgUserImage.setValue(data[0].userData.background_image);

      this.userLocation = data[0].userData.location;


    })

    this.getCountries();
  }

  getCountries(){
    this.myUserActions.getAllCountries().subscribe(data => {
      this.allCountriesArray = data;

    })
  }


  updateUserForm(){
    this.userInformationForm = this.myFormBuilder.group({
      'smallBio' : ['', Validators.compose([
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(25)])],
      'bigBio' : ['', Validators.compose([
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(1000)])], 
      'location' : ['', Validators.compose([
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(60)])],
      'userImage' : ['', Validators.compose([
        Validators.required, 
        Validators.minLength(1), 
        Validators.maxLength(1000)])],
      'bgUserImage' : ['', Validators.compose([
        Validators.required, 
        Validators.minLength(1), 
        Validators.maxLength(1000)])],

        // Apresentar control.errors no template

    })
  }

  updateUserInformation(form: any){

    let values = form.value;
    
    if(this.fileToUpload === undefined || this.fileToUpload === ''){
      this.fileToUpload = '';
    }
    
    let formData = new FormData();

    formData.append('small_bio', values.smallBio);
    formData.append('big_bio', values.bigBio);
    formData.append('location', values.location);
    formData.append('user_image', this.fileToUpload);
    formData.append('bgUser_image', values.bgUserImage);


    // Pesquisar FileReader Angular for image upload
    this.myUserActions.updateUserData(formData, this.connectedUserId).subscribe(response => {
      console.log(response);

      // Isto retornava me null porque todos os espaços têm de estar preenchidos
      // Atribuir mensagens de sucesso ou erro aqui dentro
    });

  }


  imageUpload(fileInput: any){
    // Fazer validações do tamanho da imagem

    let file = fileInput[0];

    // If the image is valid
    if(file){
      let reader = new FileReader();

      reader.onload = this.encodeFileImage.bind(this);
      reader.readAsBinaryString(file);
    }

  }


  encodeFileImage(readerEvt) {
    var binaryString = readerEvt.target.result;

    this.fileToUpload= btoa(binaryString);
    console.log(this.fileToUpload);
   }



}
