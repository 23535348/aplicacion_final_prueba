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
        return this.http.post("/api/autenticacion", JSON.stringify(usr), this.options).
        map((response: Response) => {
            // login successful if there's a jwt token in the response
            let collentionsUser = response.json();
            if(collentionsUser.length === 1){
                let user = response.json();
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                     localStorage.setItem('token', JSON.stringify(this.token = user.token));
            }else{

            }


        });
    }




    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    }

    login(username: string, password: string) {
        return this.http.post('/api/autenticacion', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }


}