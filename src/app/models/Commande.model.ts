import {User} from './User.model';
import {LigneCommande} from './LigneCommande.model';

export class Commande {
    constructor(
        public id: number,
        public user: User,
        public dateCommande,
        public state: string,
        public payementMethode: string,
        public shippingAdress: string,
        public shippingCity: string,
        public total:number

) {

}

}