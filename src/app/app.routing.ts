import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { LoginRegistroComponent } from './components/login-registro/login.registro.component';

import { AuthGuard } from './_guards/index';



const appRoutes: Routes = [
    { path: '', component: LoginComponent ,  },
    { path: 'home',      component: HomeComponent },
    { path: 'login',      component: LoginComponent },
    { path: 'loginRegistro',      component: LoginRegistroComponent },
    { path: 'about', component: AboutComponent,    },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);