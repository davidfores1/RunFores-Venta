import { Region } from "./region";

export class Customer {
    id!:number;
    document!:number;
    name!:string;
    phone!:number;
    email!:string;
    dateBirth!:Date;
    photo!:string;
    createAt!:string;
    region!:Region;
}
