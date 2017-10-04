import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ValoracionPuntoService} from '../../_services/punto/valoracion.punto.service';
import {PuntoService} from '../../_services/punto/punto.service';
@Component({
	selector: 'home',
	templateUrl: 'app/view/punto/favorito.punto.component.html'
})


export class PuntoComponent implements OnInit {

    public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
    public imageUrl = 'https://avatars2.githubusercontent.com/u/10674541?v=3&s=200';
    private puntosFavoritos = [];
	private isLoading = true;
	private punto = {};
	private isEditing: number = 1;
    private isAdd = false;


	private infoMsg = { body: "", type: "info"};

	constructor(private http: Http,
				private valoracionPuntoService : ValoracionPuntoService,
                private puntoService : PuntoService
				) {	}

	ngOnInit() {
        this.getPuntos();

    }

    getPuntos() {
        this.valoracionPuntoService.getPuntos().subscribe(
            data => this.puntosFavoritos = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    getPuntosFavoritos(punto) {
        this.valoracionPuntoService.getPuntoFavoritos(punto).subscribe(
            data => this.puntosFavoritos = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }



}