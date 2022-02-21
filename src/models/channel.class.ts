export class Channel {
    category: string;
    description: string;
    timeSent: number;
    image: any;

    constructor(obj ? : any){
        this.category = obj ? obj.category : '';        
        this.description = obj ? obj.description : '';
        this.timeSent = obj ? obj.timeSent : '';
        this.image = obj ? obj.image : '';
    }

    public toJSON() {
        return {
            category: this.category,
            description: this.description,
            timeSent: this.timeSent,
            image: this.image
        }    
    }
}