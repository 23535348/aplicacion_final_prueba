import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class  CoordenadasService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

    getCoordenadas() {
        return this.http.get('/coordenadas').map(res => res.json());
    }

    addCoordenadas(coord) {
        return this.http.post("/coordenadas", JSON.stringify(coord), this.options);
    }

    editCoordenadas(coord) {
        return this.http.put("/coordenadas/"+coord._id, JSON.stringify(coord), this.options);
    }

    deleteCoordenadas(coord) {
        return this.http.delete("/coordenadas/"+coord._id, this.options);
    }
}