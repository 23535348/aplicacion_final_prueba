import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions , Response } from '@angular/http';

@Injectable()

export class  LoginService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });
    token = null;
    user = null;
    constructor (private http: Http) {}

    newLogin(usr) {
        return this.http.post("/api/autenticacion", JSON.stringify(usr), this.options);
    }



}