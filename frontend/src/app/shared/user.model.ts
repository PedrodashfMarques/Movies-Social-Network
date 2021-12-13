export class User{
    constructor(
        public userId: number,
        public firstName: string,
        public username: string,
        public lastName: string,
        private JWToken: string,
        public expiresIn: Date
    ){}

    get Token(){
        if(!this.expiresIn || new Date() > this.expiresIn){
            return null
        }

        return this.JWToken;
    }
}