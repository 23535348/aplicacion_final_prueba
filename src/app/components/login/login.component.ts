import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';


import {LoginService} from '../../_services/login/login.service';
import {isNullOrUndefined} from "util";

@Component({
    selector: 'home',
    templateUrl: 'app/view/login/login.component.html'
})

export class LoginComponent implements OnInit {

    private model: any = {};
    private loading = false;
    private returnUrl: string;
    private userForm: FormGroup;
    private username = new FormControl("", Validators.required);
    private password = new FormControl("", Validators.required);

    private usuarios = [];
     private isLogged:boolean;

    token = null;
    user = null;
    private infoMsg = { body: "", type: "info"};
    constructor(
        private http : Http,
        private router: Router,
        private loginService : LoginService,
        private formBuilder: FormBuilder

           ) { }


    ngOnInit() {
        // reset login status
        this.logout();
        this.userForm = this.formBuilder.group({
            username: this.username,
            password: this.password
        });
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    newLogin() {
        this.loading = true;
       this.returnUrl= 'home';
       // this.userForm.value= 1;

        this.loginService.newLogin(this.userForm.value).subscribe(
                res => {
                      //  this.sendInfoMsg("item deleted successfully.", "success");
                    let collentionsUser = res.json();
                   // alert(collentionsUser.length);
                    if(collentionsUser === null){
                        alert("no autenticado");
                        this.loading = false;
                       }else{
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', collentionsUser.nombre);
                        localStorage.setItem('currentUserId', collentionsUser._id);
                       // localStorage.setItem('token', JSON.stringify(this.token = user.token));
                        alert("Bienvenido  "+collentionsUser.nombre);
                       this.router.navigate([this.returnUrl]);
                      //  this.loading = false;
                    }


                },
                error => {
                   this.loading = false;
                });
    }


    logout() {
        this.returnUrl = 'login';
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('currentUser');
        this.router.navigate([this.returnUrl]);
    }


    sendInfoMsg(body, type, time = 3000) {
        this.infoMsg.body = body;
        this.infoMsg.type = type;
        window.setTimeout(() => this.infoMsg.body = "", time);
    }


}
