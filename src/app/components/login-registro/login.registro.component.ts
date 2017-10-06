import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import {UserService} from '../../_services/usuario/user.service';


@Component({
    selector: 'about',
    templateUrl: 'app/view/login-registro/login.registro.component.html'
})

export class LoginRegistroComponent implements OnInit {

    //Variables de formulario
    private addUserForm: FormGroup;
    private nombre= new FormControl("", Validators.required);
    private contrasenia= new FormControl("", Validators.required);
    private password_repit= new FormControl("", Validators.required);
    private email= new FormControl("", Validators.required);
    // Gestion de mensajes
    private infoMsg = { body: "", type: "info"};

    private usuarios = [];
    // Control de validaciones
    model: any = {};
    loading = false;
    private returnUrl: string;


    constructor(
        private http : Http ,
        private router: Router,
        private userService : UserService,
        private formBuilder: FormBuilder
           ) { }
  addUsuario() {
      this.loading = true;
      this.returnUrl= 'login';
      if(this.contrasenia.value === this.password_repit.value ){
          this.userService.verificarEmail(this.addUserForm.value).subscribe(
              res => {
                  var resultado = res.json();
                   if(resultado === null){
                       this.userService.verificarUsuario(this.addUserForm.value).subscribe(
                           res => {
                               var resultado = res.json();
                               if(resultado === null){
                                  this.userService.addUsuario(this.addUserForm.value).subscribe(
                                       res => {
                                           var newUsuario = res.json();
                                           this.model = {newUsuario};
                                           this.usuarios.push(newUsuario);
                                           this.addUserForm.reset();
                                            alert('Registro Exitoso');
                                           this.router.navigate([this.returnUrl]);
                                       },
                                       error => console.log(error)
                                   );
                               }else{
                                   alert('no disponible el usuario');
                               }

                           },
                           error => console.log(error)
                       );


                   }else{

                       alert('no disponible el email');

                   }
                console.log(resultado);

              },
              error => console.log(error)
          );
      }else{
          alert("Verificar las contraseñas");
      }
      this.loading = false;

    }
    ngOnInit() {
        this.addUserForm = this.formBuilder.group({
            nombre: this.nombre,
            contrasenia: this.contrasenia,
            email: this.email,
            password_repit: this.password_repit
        });
    }

    sendInfoMsg(body, type, time = 3000) {
        this.infoMsg.body = body;
        this.infoMsg.type = type;
        window.setTimeout(() => this.infoMsg.body = "", time);
    }



}
