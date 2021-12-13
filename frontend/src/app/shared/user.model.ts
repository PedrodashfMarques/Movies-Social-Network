export class User{
    constructor(
        public userId: number,
        public firstName: string,
        public username: string,
        public lastName: string,
        private JWToken: string
    ){}

    get Token(){
        return this.JWToken;
    }
}