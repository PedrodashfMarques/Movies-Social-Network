import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";

  bootcamp: string = "https://images8.alphacoders.com/926/thumb-1920-926492.jpg";

  userIsVerified: boolean = true;

  mensagem: string = "Posted November 8th, 2021 at 17h28";

  contentPost: string ="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis alias magni, iusto quo vel id nam. Deleniti blanditiis eius at earum, enim incidunt, expedita tenetur impedit illum, molestias ab porro?"

  likes: number = 0;


  constructor() { }

  ngOnInit(): void {

  }

  daLike(){
    console.log("hello");
    this.likes++;
  }

}
