export class Chat {
    text: string;
    timeSent: number;
    image: any;
    fromID: any;
    fromName: string;
    fromStatus: boolean;
    codeBlock: boolean;
    toID: any;
    toName: string;
    toStatus: boolean;


    constructor(obj?: any) {
            this.text = obj ? obj.text : '';
            this.timeSent = obj ? obj.timeSent : '';
            this.image = obj ? obj.image : '';
            this.fromID = obj ? obj.fromID : '';
            this.fromName = obj ? obj.fromName : '';
            this.fromStatus = obj ? obj.fromStatus : '';
            this.codeBlock = obj ? obj.codeBlock : false;
            this.toID = obj ? obj.toID : '';
            this.toName = obj ? obj.toName : '';
            this.toStatus = obj ? obj.toStatus : '';
           
    }

    public toJSON() {
        return {
            text: this.text,
            timeSent: this.timeSent,
            image: this.image,
            fromID: this.fromID,
            fromName: this.fromName,
            fromStatus: this.fromStatus,
            codeBlock: this.codeBlock, 
            toID: this.toID,
            toName: this.toName,
            toStatus: this.toStatus 
        }
    }
}