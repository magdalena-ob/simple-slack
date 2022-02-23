export class Message {
    textMessage: string;
    timeSent: number;
    image: any;
    from: any;

    constructor(obj?: any) {
            this.textMessage = obj ? obj.textMessage : '';
            this.timeSent = obj ? obj.timeSent : '';
            this.image = obj ? obj.image : '';
            this.from = obj ? obj.from : '';
           
    }

    public toJSON() {
        return {
            textMessage: this.textMessage,
            timeSent: this.timeSent,
            image: this.image,
            from: this.from
            
        }
    }
}