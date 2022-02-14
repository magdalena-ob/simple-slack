export class Message {
    textmessage: any;

    constructor(obj?: any) {
            this.textmessage = obj ? obj.message : '';
           
    }

    public toJSON() {
        return {
            message: this.textmessage
            
        }
    }
}