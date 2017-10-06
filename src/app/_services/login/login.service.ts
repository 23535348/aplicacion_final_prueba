import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions , Response } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()

export class  LoginService {
    private returnUrl: string;
    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });
    token = null;
    user = null;
    constructor (  private router: Router,private http: Http) {}

    newLogin(usr) {
        return this.http.post("/api/autenticacion", JSON.stringify(usr), this.options);
    }


    logout() {
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentLogin');
        localStorage.setItem('currentLogin', '0');
        this.returnUrl = 'login';
        this.router.navigate([this.returnUrl]);
    }


}