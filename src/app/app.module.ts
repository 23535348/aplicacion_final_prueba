import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/login/login.component';
import {LoginRegistroComponent} from './components/login-registro/login.registro.component';

//Rutas generales
import { routing } from './app.routing';
//Para nevegacion de rutas hijas
import { AuthGuard } from './_guards/index';

//apis
import {CatService} from './_services/cat.service';
import { LoginService} from "./_services/login/login.service";
import { PuntoService} from "./_services/punto/punto.service";
import { UserService} from "./_services/usuario/user.service";
import {ValoracionCoordenadasService} from "../service/valoracion.coordenadas.service";
import { CeiboShare } from 'ng2-social-share';

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
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key= AIzaSyBsfNPBgKI25fxsgHPcPfrc3fCJcJxLGFc '})
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        LoginComponent,
        LoginRegistroComponent,
        CeiboShare
    ],
    providers: [
        CatService,
        UserService,
        AuthGuard,
        BrowserModule,
        LoginService,
        PuntoService,
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