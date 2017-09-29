import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';


import {LoginService} from '../../_services/login/login.service';

@Component({
    selector: 'about',
    templateUrl: 'app/view/login/login.component.html'
})

export class LoginComponent implements OnInit {

    private model: any = {};
    private loading = false;
    private returnUrl: string;
    private username: string;
    private password: string;
    private userForm: FormGroup;
    private usuarios = [];
     private isLogged:boolean;

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
        this.loginService.newLogin(this.userForm.value)
            .subscribe(
                data => {

                        this.router.navigate([this.returnUrl]);
                        this.sendInfoMsg("item deleted successfully.", "success");


                },
                error => {
                  //this.alertService.error(error);
                //    this.loading = false;
                });
    }


    logout() {

        this.returnUrl = 'login';
        this.loginService.logout();
        this.router.navigate([this.returnUrl]);
    }


    sendInfoMsg(body, type, time = 3000) {
        this.infoMsg.body = body;
        this.infoMsg.type = type;
        window.setTimeout(() => this.infoMsg.body = "", time);
    }


}
