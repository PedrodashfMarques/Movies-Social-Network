export class Comentario{
    constructor(
        public title: string = '',
         public body: string = '', 
         public profileImage: string = '', 
         public profileName: string = '',
         public likesNumber: number = 0){
    }
}