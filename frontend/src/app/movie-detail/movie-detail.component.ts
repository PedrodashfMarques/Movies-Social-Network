import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from 'src/app/shared/comments.model';
import { Movie } from "../shared/movie.model";
import { moviesService } from '../movies.service';
import { AuthService } from '../shared/auth.service.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],

})
export class MovieDetailComponent implements OnInit {

  @ViewChild('dadosEnviados') dadosDoForm: NgForm;

  isLoading: boolean;

  // ------ Variáveis ------

  modalAberto: boolean;

  filmeId: number; // Isto é o id que fui buscar com o snapshot.params
  cadaMovie: Movie;  // Isto é o dado que recebi do subscribe para saber qual o filme a fazer loading no movie-detail.component.
  
  cadaFilmeFavorito: boolean;
  
  todosOsFilmes: Movie[];

  comentariosEspecificos: Comentario[];

  myProfileImage: string = "https://media-exp1.licdn.com/dms/image/C4D03AQG9srscKSH-Bg/profile-displayphoto-shrink_800_800/0/1627326668603?e=1632960000&v=beta&t=MNaQTwVGnt2OmL8PFFmpeyT3A2JMIH-3etKo9AlqNKk";
  myProfileName: string = "Pedro Marques";

  public novoComentario: Comentario;

  filmesSemelhantes: Movie[] | undefined; // Este é o array de filmes Similares que estou a enviar o componente filho através de um Subject no componente filho

  // ------ Variáveis ------
  
  constructor(private myActiveService: ActivatedRoute,
     private myMovieService: moviesService,
     private myRouter: Router,
     private myAuthService: AuthService) { }

     
  ngOnInit(): void {
    const movieId:number = +this.myActiveService.snapshot.paramMap.get('id'); // Aqui tenho de colocar o + no this.myactiveService para poder recuperar valores numéricos e não apenas Strings
    this.filmeId = movieId;

    this.todosOsFilmes = this.myMovieService.getMovies();

    this.myMovieService.getSpecificMovie(movieId).subscribe(theData =>{ 
      this.cadaMovie = theData; 
      this.cadaFilmeFavorito = theData.favourite; // Tenho que fazer isto para que sempre que o componente inicie tenha lá os dados corretos
    });


    this.myMovieService.recuperarComentarios(movieId).subscribe(data =>{
      this.comentariosEspecificos = data;
    });


    this.myMovieService.getSimilarMovies(movieId).subscribe((osDados: Movie[]) =>{
      this.filmesSemelhantes = osDados
    });


    this.isLoading = false;
    
    this.myAuthService.userLoggedOut.subscribe((data: boolean) => {
      this.isLoading = data;
    })

  }

  marcarFavorito():void{
      //Aqui faço com que aquele filme com base naquele id especifico vá à propriedade de isFavourite e pass para true ou false
    this.myMovieService.toggleFavourite(this.filmeId);

    // Este Subscribe faz com que mostre Add to list ou remove from list de forma dinâmica por causa daquele filme especifico
    this.myMovieService.getSpecificMovie(this.filmeId).subscribe(theData =>{
      this.cadaFilmeFavorito = theData.favourite;
    })

  }
  
  newComment():void{
    let tituloComentario = this.dadosDoForm.value.commentTitle;
    let corpoComentario = this.dadosDoForm.value.commentBody;

    this.novoComentario = new Comentario(tituloComentario,corpoComentario,this.myProfileImage, this.myProfileName);

    this.myMovieService.adicionarComentario(this.novoComentario, this.filmeId);

  }

  daLike(i: number):void{
   
    if(this.comentariosEspecificos[i].likesNumber == 0){
      this.comentariosEspecificos[i].likesNumber++

    } else{
      this.comentariosEspecificos[i].likesNumber = this.comentariosEspecificos[i].likesNumber - 1
    }
  }

  apagarComentario(index: number): void{
    this.myMovieService.apagarComentarioEspecifico(index, this.filmeId);
  }
  

  vaiParaOFilmeSimilar(cadaFilme: number) {
    this.myRouter.navigateByUrl('/lounge', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/movie/id/',cadaFilme]);
    })

  }

  goToPreviousPage(): void {
      this.myRouter.navigate(['/lounge']);
    
  }

  abrirModal(): void{
    this.modalAberto = !this.modalAberto;
  }


  fecharModal(): void{
    this.modalAberto = null;
    // Para fazer isto tive de utilizar Property Binding + Event Binding para o Alert Modal Component -> pasta Shared
  }

}