import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { moviesService } from 'src/app/movies.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-trailer-modal',
  templateUrl: './trailer-modal.component.html',
  styleUrls: ['./trailer-modal.component.scss']
})
export class TrailerModalComponent implements OnInit {

  filmeId: number;

  cadaMovie: Movie;

  @Input() modalAberto: boolean;

  @Output() closeModal = new EventEmitter<void>();


  constructor(private myMoviesService: moviesService, private myActiveRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const movieId:number = +this.myActiveRoute.snapshot.paramMap.get('id');

    this.filmeId = movieId;


    this.myMoviesService.getSpecificMovie(movieId).subscribe(theData =>{ 
      this.cadaMovie = theData;
      
    });

  }

  fecharModal(){
    this.closeModal.emit()

  }

}
