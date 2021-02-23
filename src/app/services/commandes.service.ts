import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';
import {environment} from '../../environments/environment';
import {Commande} from '../models/Commande.model';
import {LigneCommande} from '../models/LigneCommande.model';

@Injectable({
    providedIn: 'root'
})
export class CommandesService {
    commandesSubject: Subject<any> = new Subject<any>();
    commandes: Commande[]


    constructor(private authService: AuthService,
                private http: HttpClient,
                private sharedService: SharedService) {
    }

    emitCommandes() {
        this.commandesSubject.next(this.commandes);
    }

    public fetchCommandes(username: string,state:string="*") {
        return new Observable(observer => {

            this.http.get
            (`${environment.backEndUrl}/user/commandes?username=${username}&state=${state}`, this.authService.httpOptions()).subscribe(
                (resData: any) => {
                    this.commandes = resData;
                    this.emitCommandes()
                    observer.complete()
                },
                (error) => {
                    observer.error(error)
                }
            )

        })
    }


    addCommande(username: string,
                payementMethode: string,
                shippingAdress:string,
                shippingCity:string) {
        console.log(username,payementMethode,shippingAdress,shippingCity)
        return new Observable(observer => {
            this.http.post
            (`${environment.backEndUrl}/user/commandes/add`,
                {
                    user:{username: username},
                    payementMethode: payementMethode,
                    shippingAdress:shippingAdress,
                    shippingCity:shippingCity
                },
                this.authService.httpOptions()).subscribe(
                (resData: any) => {
                    observer.complete();
                },
                (error) => {
                    observer.error(error)
                }
            )
        })
    }

    editCommande(
        id: number,
        state: string) {
        return this.http.put
        (`${environment.backEndUrl}/admin/commandes/edit?id=${id}`,
            {
                state: state,
            },
            this.authService.httpOptions())
    }


    deleteCommande(id: number) {
        return this.http.delete(`${environment.backEndUrl}/user/commandes/delete?id=${id}`
            , this.authService.httpOptions())
    }


}
