export class User {
    userID: string;
    name: string;
    email: string;
    status: string;     //z.B. aktive or inaktive
    channel: string;

    constructor(obj?: any) {
        this.userID = obj ? obj.userID : '';
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.status = obj ? obj.status : '';
        this.channel = obj ? obj.channel : '';
    }

    public toJSON() {
        return {
            userID: this.userID,
            name: this.name,
            email: this.email,
            status: this.status,
            channel: this.channel
     
        }
    }
}