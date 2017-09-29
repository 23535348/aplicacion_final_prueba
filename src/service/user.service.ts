import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class  UserService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

    getUsuarios() {
        return this.http.get('/usuarios').map(res => res.json());
    }
    addUsuarios(usuario) {
        return this.http.post("/usuarios", JSON.stringify(usuario), this.options);
    }

    editUsuarios(id_user) {
        return this.http.put("/usuarios/"+id_user._id, JSON.stringify(id_user), this.options);
    }

    deleteUsuarios(id_user) {
        return this.http.delete("/usuarios/"+id_user._id, this.options);
    }
}