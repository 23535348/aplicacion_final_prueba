import {Component, OnInit} from '@angular/core';
import {LoginService} from './_services/login/login.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app',
	templateUrl: 'app/app.component.html'
})

export class AppComponent  implements OnInit {

    private currentLogin = localStorage.getItem('currentLogin');
    private currentUser = localStorage.getItem('currentUser');
    private returnUrl: string;

    constructor(
                private loginService : LoginService,
                private router: Router
    ) {	}
    ngOnInit() {
		this.restriccion();
    }
    restriccion(){
      if(this.currentLogin === '0'){
          this.returnUrl = '';
          this.router.navigate([this.returnUrl]);
          alert("Debe iniciar sesion como usuario");
	  }
	}

    logout() {
        this.loginService.logout();
    }
}
