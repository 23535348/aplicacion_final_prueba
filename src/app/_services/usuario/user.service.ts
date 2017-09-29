import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions } from '@angular/http';

@Injectable()

export class  UserService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

    getUsuarios() {
        return this.http.get('/usuarios').map(res => res.json());
    }
    addUsuario(usr) {
        return this.http.post("/usuario", JSON.stringify(usr), this.options);
    }

    editUsuario(usr) {
        return this.http.put("/usuario/"+usr._id, JSON.stringify(usr), this.options);
    }

    deleteUsuario(usr) {
        return this.http.delete("/usuario/"+usr._id, this.options);
    }
}