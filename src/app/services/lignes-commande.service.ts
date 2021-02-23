import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';
import {Product} from '../models/Product.model';
import {environment} from '../../environments/environment';
import {LigneCommande} from '../models/LigneCommande.model';

@Injectable({
  providedIn: 'root'
})
export class LignesCommandeService {
    ligneCommandeSubject: Subject<any> = new Subject<any>();
    lignesCommandes: LigneCommande[]

    emitLignesCommandes() {
        this.ligneCommandeSubject.next(this.lignesCommandes);
    }

    constructor(private authService: AuthService,
                private http: HttpClient,
                private sharedService: SharedService) {
    }

    public fetchCart(username: string) {
        return new Observable(observer => {

            this.http.get
            (`${environment.backEndUrl}/user/cart?username=${username}`, this.authService.httpOptions()).subscribe(
                (resData: any) => {
                    this.lignesCommandes = resData;
                    this.emitLignesCommandes();
                    observer.complete()
                },
                (error) => {
                    observer.error(error)
                }
            )

        })
    }


    addToCart(product: Product,
               quantity: number,
               username: string) {
        return new Observable(observer => {
            this.http.post
            (`${environment.backEndUrl}/user/cart/addLigne`,
                {
                    product: product,
                    quantity: quantity,
                    user:{username: username},

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



    deleteFromCart(id: number) {
        return this.http.delete(`${environment.backEndUrl}/user/cart/deleteLigne?id=${id}`
            , this.authService.httpOptions())
    }
}