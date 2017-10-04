import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()

export class ValoracionPuntoService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}
    // consulta de favoritos por usuarios
    favoritoPunto(punto, usuario) {
        return this.http.get("/favoritos/"+punto._id+"/"+usuario).map(res => res.json());
    }
    // Registro de nuevo voto para punto
    addFavoritoPunto(punto , usuario) {
        return this.http.post("/favorito/Add/"+punto._id+"/"+usuario, JSON.stringify(punto), this.options);
    }

    // consulta de seguidores por punto
    getPuntoFavoritos(punto) {
        return this.http.get('/puntos/Favorito/Seguidores/'+punto).map(res => res.json());
    }

    // consulta de todos los favoritos
    getPuntos() {
        return this.http.get('/favorito').map(res => res.json());
    }

    addFavoritoPuntoVoto(punto) {
        return this.http.put("/favorito/voto/"+punto._id, JSON.stringify(punto), this.options);
 }


}
