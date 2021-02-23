import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';
import {environment} from '../../environments/environment';
import {User} from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    usersSubject: Subject<any> = new Subject<any>();
    users: User[]
    emitUsers() {
        this.usersSubject.next(this.users);
    }


    constructor(private authService: AuthService,
                private http: HttpClient,
                private sharedService: SharedService) {
    }

    public fetchUsers(keyword: string,state:string) {
        return new Observable(observer => {

            this.http.get
            (`${environment.backEndUrl}/manager/users?keyword=${keyword}&state=${state}`,
                this.authService.httpOptions()).subscribe(
                (resData: any) => {
                    this.users = resData;
                    this.emitUsers();
                    observer.complete()
                },
                (error) => {
                    observer.error(error)
                }
            )

        })
    }

    public getUser(username: string) {
        return new Observable(observer => {

            this.http.get
            (`${environment.backEndUrl}/user/users/get?username=${username}`,
                this.authService.httpOptions()).subscribe(
                (resData: any) => {
                    this.users = resData;
                    this.emitUsers();
                    observer.complete()
                },
                (error) => {
                    observer.error(error)
                }
            )

        })
    }



    editUser(
        username: string,
        firstName: string,
        lastName: string,
        adresse:string,
        mail:string,
        city:string,
        phone:string,
        state:string,) {
        return this.http.put
        (`${environment.backEndUrl}/user/users/edit?username=${username}`,
            {
                firstName: firstName,
                lastName: lastName,
                adresse:adresse,
                mail:mail,
                city:city,
                phone:phone,
                state:state
            },
            this.authService.httpOptions())
    }



    editPassword(username: string,oldPasswprd:string, password: string) {
        return new Observable(observer=>{
            this.http.put
            (`${environment.backEndUrl}/user/users/editpassword?username=${username}`,
                {
                    oldPassword:oldPasswprd,
                    password:password},
                this.authService.httpOptions()).subscribe(
                (resData:any)=>{
                    observer.complete();
                },
                (error)=>{observer.error(error)}
            )

        })
    }


}