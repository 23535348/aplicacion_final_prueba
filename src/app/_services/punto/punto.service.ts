import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()

export class PuntoService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

    getPuntos() {
        return this.http.get('/puntos').map(res => res.json());
    }

    addPunto(punto) {
        return this.http.post("/punto", JSON.stringify(punto), this.options);
    }

    editPunto(punto) {
        return this.http.put("/punto/"+punto._id, JSON.stringify(punto), this.options);
    }

    deletePunto(punto) {
        return this.http.delete("/punto/"+punto._id, this.options);
    }

}
