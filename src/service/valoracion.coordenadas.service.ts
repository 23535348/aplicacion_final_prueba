import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class  ValoracionCoordenadasService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

    getCoordenadasValoracion() {
        return this.http.get('/coordenadas/valoracion').map(res => res.json());
    }

    addCoordenadasValoracion(valoracion) {
        return this.http.post("/coordenadas/valoracion", JSON.stringify(valoracion), this.options);
    }

    editCoordenadasValoracion(valoracion_id) {
        return this.http.put("/coordenadas/valoracion/"+valoracion_id._id, JSON.stringify(valoracion_id), this.options);
    }

    deleteCoordenadasValoracion(valoracion_id) {
        return this.http.delete("/coordenadas/valoracion/"+valoracion_id._id, this.options);
    }
}