export default class User{
    id : number;
    name : string;
    passwordHash : string;

    constructor(id: number, name: string, passwordHash: string) {
        this.name = name;
        this.passwordHash = passwordHash;
        this.id = id;
    }
}