import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Comentario } from "src/app/shared/comments.model";
import { listaFilmes } from "./lista-filmes";
import { Movie } from "./shared/movie.model";

@Injectable({
    providedIn: 'root',
})

export class moviesService{

    allMovies: Movie[] = listaFilmes;


    filmesQueForamFiltrados = new Subject <Movie[]>();


    // Recupera todos os filmes
    getMovies(){
        return this.allMovies;
    }


    // Recupera as informações daquele filme especifico (que está a fazer loading). 
    getSpecificMovie(movieId: number): Observable<Movie>{
        return of(this.allMovies.find(row => row.id == movieId));
    }


    getSimilarMovies(filmeId: Number): Observable <Movie[]>{
        let procuraIdSff: Movie = this.allMovies.find(row => row.id == filmeId);

        let novoArrayFilmesSemelhantes: Movie[] = [];

        for (let index = 0; index < this.allMovies.length; index++) {
            let posicaoDoIndex = this.allMovies[index];

            if(procuraIdSff.genre === posicaoDoIndex.genre && procuraIdSff.title != posicaoDoIndex.title){
                // Tive de aplicar a segunda condição neste if senão o filme base que procura filmes semelhantes a esse iria se repetir.
                novoArrayFilmesSemelhantes.push(posicaoDoIndex);
            }
        }

        return of(novoArrayFilmesSemelhantes);
    }


    getFavouriteMovies(){
        let arrayFilmesFavoritos: Movie[] = [];

        for (let index = 0; index < this.allMovies.length; index++) {
            let posicaoDoIndex = this.allMovies[index];

            if(posicaoDoIndex.favourite){
                arrayFilmesFavoritos.push(posicaoDoIndex);
            }
        }

        return arrayFilmesFavoritos;
    }

    // Recupera o array de comentarios daquele filme específico. 
    recuperarComentarios(filmeId: number): Observable<Comentario[]>{ // Rever se é mesmo necessário retornar Movie ou Comentario 
        let procuraIdSff = this.allMovies.find(row => row.id == filmeId);
    
        return of(procuraIdSff.comments);
    }


    adicionarComentario(novoComentario: Comentario, filmeId: number){
        let procuraIdSff = this.allMovies.find(row => row.id == filmeId);
        
        for (let index = 0; index < this.allMovies.length; index++) {
            let posicaoDeId = this.allMovies[index];
            
            if(posicaoDeId.id === procuraIdSff.id ){
                posicaoDeId.comments.push(novoComentario);
            }
        }

    }
    
    apagarComentarioEspecifico(indexComentario: number, filmeId: number){
        let procuraIdSff: Movie = this.allMovies.find(row => row.id == filmeId);

        for (let index = 0; index < this.allMovies.length; index++) {
            let posicaoDeId = this.allMovies[index];

            if(procuraIdSff.id === posicaoDeId.id){

                for (let index = 0; index < posicaoDeId.comments.length; index++) {

                     if(posicaoDeId.comments[indexComentario] === posicaoDeId.comments[index]){

                        posicaoDeId.comments.splice(indexComentario, 1);
                    }

                }
                
            }

        }

    }

    pesquisarFilme(filmePesquisado: string, generoPesquisado: string): Observable<Movie[]>{
        
        let filmesEncontrados: Movie[] = [];
        let filmesEncontradosGeneros: Movie[] = [];
        
        if(generoPesquisado !== ''){
            for (let row of this.allMovies) {

                let generoDoFilme = row.genre.toLowerCase();
    
                if(generoDoFilme.indexOf(generoPesquisado) >= 0){
                    filmesEncontradosGeneros.push(row);
                }
            }
        } else{
            filmesEncontradosGeneros = this.allMovies;
        }

        if(filmePesquisado !== ''){
            for (let row of filmesEncontradosGeneros) {
                let tituloDoFilme = row.title.toLowerCase();
        
                if(tituloDoFilme.indexOf(filmePesquisado) >= 0){
    
                    filmesEncontrados.push(row);
                }
            }
            
        } else{
            filmesEncontrados = filmesEncontradosGeneros;
        }
             
        return of(filmesEncontrados);
    // Tive de perceber novamente a aula do Prof Ivo para fazer esta função, (ficheiro4.ts)
    }

    
    toggleFavourite(filmeId: number){
       let procuraIdSff = this.allMovies.find(row => row.id == filmeId)
       
       for (let index = 0; index < this.allMovies.length; index++) {

           let posicaoDoIndex = this.allMovies[index];

           if(procuraIdSff.id == posicaoDoIndex.id){
            procuraIdSff.favourite = !procuraIdSff.favourite;
           }
       }
    }

}