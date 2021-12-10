import { Comentario } from "./comments.model";

export class Movie{
    public title: string = "";
    public id: number = 1;
    public releaseDate: number = 0;
    public genre: string = "";
    public favourite: boolean = false;
    public trailer: string = '';
    public description: string = "";
    public image: string = "";
    public comments: Comentario[];
}