import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  userBio: string;

  constructor() { }

  ngOnInit(): void {
  }

  // Neste ficheiro ts vou ter que ter um método que chama um e vai buscar a informação do user.bigBio por exemplo

}
