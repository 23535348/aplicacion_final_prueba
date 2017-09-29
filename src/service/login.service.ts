import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class  LoginService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

    getLogin() {
        return this.http.get('/login/salir').map(res => res.json());
    }

    ingresarLogin(datos) {
        return this.http.post("/login/ingresar", JSON.stringify(datos), this.options);
    }

}