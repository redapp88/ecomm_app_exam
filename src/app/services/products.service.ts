import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Product} from '../models/Product.model';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    productsSubject: Subject<any> = new Subject<any>();
    products: Product[]
    selectedProduct: Product
    selectedProductSubject: Subject<any> = new Subject<any>();

    emitProducts() {
        this.productsSubject.next(this.products);
    }

    emitselectedProduct() {
        this.selectedProductSubject.next(this.selectedProduct);
    }


    constructor(private authService: AuthService,
                private http: HttpClient,
                private sharedService: SharedService) {
    }

    public fetchProducts(label: string) {
        return new Observable(observer => {

            this.http.get
            (`${environment.backEndUrl}/user/products?label=${label}`, this.authService.httpOptions()).subscribe(
                (resData: any) => {
                    this.products = resData;
                    this.emitProducts()
                    observer.complete()
                },
                (error) => {
                    observer.error(error)
                }
            )

        })
    }


    addProduct(id: string,
               label: string,
               price: number,
               quantity: number) {
        console.log(`${environment.backEndUrl}}/admin/products/add`)
        return new Observable(observer => {
            this.http.post
            (`${environment.backEndUrl}/admin/products/add`,
                {
                    id: id,
                    label: label,
                    price: price,
                    quantity: quantity,
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

    editProduct(
        id: string,
        label: string,
        price: string,
        quantity: number) {
        return this.http.put
        (`${environment.backEndUrl}/admin/products/edit?id=${id}`,
            {
                label:label,
                price: price,
                quantity: quantity,
            },
            this.authService.httpOptions())
    }


    deleteProduct(id: string) {
        return this.http.delete(`${environment.backEndUrl}/admin/products/delete?id=${id}`
            , this.authService.httpOptions())
    }


}
