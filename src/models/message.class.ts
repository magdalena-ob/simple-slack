export class Message {
    textMessage: string;

    constructor(obj?: any) {
            this.textMessage = obj ? obj.textMessage : '';
           
    }

    public toJSON() {
        return {
            textMessage: this.textMessage
            
        }
    }
}