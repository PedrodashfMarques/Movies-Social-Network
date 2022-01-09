export class User{
    constructor(
        public userId: number,
        public firstName: string,
        public username: string,
        public lastName: string,
        public location: string,
        public smallBio: string,
        public bigBio: string,
        public userImage: string,
        public backgroundImage: string,
        public isAdmin: number,
        public isVerified: number,
        private JWToken: string,
    ){}
}