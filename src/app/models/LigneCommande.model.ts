import {Product} from './Product.model';
import {Commande} from './Commande.model';
import {User} from './User.model';

export class LigneCommande {
    constructor(public id: number,
                public product: Product,
                public quantity:number,
                public commande: Commande,
                public user: User
    ) {

    }
}