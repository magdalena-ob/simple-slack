export class Message {
    textMessage: string;
    timeSent: number;
    image: any;
    fromID: any;
    fromName: string;
    codeBlock: boolean;

    constructor(obj?: any) {
            this.textMessage = obj ? obj.textMessage : '';
            this.timeSent = obj ? obj.timeSent : '';
            this.image = obj ? obj.image : '';
            this.fromID = obj ? obj.fromID : '';
            this.fromName = obj ? obj.fromName : '';
            this.codeBlock = obj ? obj.codeBlock : false;
           
    }

    public toJSON() {
        return {
            textMessage: this.textMessage,
            timeSent: this.timeSent,
            image: this.image,
            fromID: this.fromID,
            fromName: this.fromName,
            codeBlock: this.codeBlock
            
        }
    }
}