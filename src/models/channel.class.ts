export class Channel {
    category: string;
    description: string;

    constructor(obj ? : any){
        this.category = obj ? obj.category : '';        
        this.description = obj ? obj.description : '';
    }

    public toJSON() {
        return {
            category: this.category,
            description: this.description,
        }    
    }
}