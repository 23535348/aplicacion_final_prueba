import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()

export class CategoriaService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

    getCats() {
        return this.http.get('/categorias').map(res => res.json());
    }

    addCat(cat) {
        return this.http.post("/categoria", JSON.stringify(cat), this.options);
    }

    editCat(cat) {
        return this.http.put("/categoria/"+cat._id, JSON.stringify(cat), this.options);
    }

    deleteCat(cat) {
        return this.http.delete("/categoria/"+cat._id, this.options);
    }

}
