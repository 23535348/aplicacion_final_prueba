import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
//Componentes generales internos (modulos)
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/login/login.component';
import {LoginRegistroComponent} from './components/login-registro/login.registro.component';
import {PuntoComponent} from './components/punto/punto.component';
import {MapaComponent} from './components/mapa/mapa.component';
import { MapaGestionComponent } from './components/mapa/mapa.gestion.component';


//Rutas generales
import { routing } from './app.routing';


//apis
import {CatService} from './_services/cat.service';
import { LoginService} from "./_services/login/login.service";
import { PuntoService} from "./_services/punto/punto.service";
import { UserService} from "./_services/usuario/user.service";
import {ValoracionPuntoService} from "./_services/punto/valoracion.punto.service";
import {MapaService} from "./_services/mapa/mapa.service";
import { CeiboShare } from 'ng2-social-share';
import {CategoriaService} from "./_services/categorias/categoria.service";

//mapa instalacion
import { NguiMapModule} from '@ngui/map';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import {enableProdMode} from '@angular/core';
enableProdMode();

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDg1kQmRhYE8o8WcI0uWoyeZ1OQhNpv6xo'})
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        LoginComponent,
        LoginRegistroComponent,
        CeiboShare,
        PuntoComponent,
        MapaComponent,
        MapaGestionComponent
    ],
    providers: [
        CatService,
        UserService,
        BrowserModule,
        LoginService,
        PuntoService,
        ValoracionPuntoService,
        MapaService,
        CategoriaService,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})


export class AppModule {
 constructor(){}

}