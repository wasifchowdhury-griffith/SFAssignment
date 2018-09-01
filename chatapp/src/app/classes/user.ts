export class User {
    id: number;
    user: string;
    email: string;

    constructor(id: number, user: string, email: string){
        this.id = id;
        this.user = user;
        this.email = email;
    }
}