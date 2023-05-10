import { Entretien } from "./entretien";

export class Candidature {
    idCondidate!: number;
    EnumType!:string;
    EnumPost!: string;
    firstName!:Date;
    lastname!:Date;
    email!:string;
    mobile!:string;
    cv!:string;
    idEntretien!:Entretien;
}