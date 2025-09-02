export default class Tasc {
    id : number;
    title: string;
    description: string;
    timestamp: string;
    userId: string | number;

    constructor(id: number, title: string, description: string, timestamp: string, userId: string |number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.timestamp = timestamp;
        this.userId = userId;
    }
}