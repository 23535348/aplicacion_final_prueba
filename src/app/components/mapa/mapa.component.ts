import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { RouterLinkWithHref , ActivatedRoute , Params  } from '@angular/router';
import {ValoracionPuntoService} from '../../_services/punto/valoracion.punto.service';
import {MapaService} from '../../_services/mapa/mapa.service';
@Component({
	selector: 'mapa',
	templateUrl: 'app/view/mapa/mapa.component.html'
})


export class MapaComponent implements OnInit {

    public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
    public imageUrl = 'https://avatars2.githubusercontent.com/u/10674541?v=3&s=200';
    private mapasPunto = [];
	private isLoading = true;
	private mapaPunto = {};
	private isEditing: number = 1;
    private isAdd = false;
    private mapaId: string;

	private infoMsg = { body: "", type: "info"};

	constructor(private http: Http,
				private valoracionPuntoService : ValoracionPuntoService,
                private mapaService : MapaService,
                private activatedRoute: ActivatedRoute
) {	}

	ngOnInit() {

        this.getMapa();

    }

    getMapa() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.mapaId = params['id'];
            ///console.log(mapaId);
        });
        this.mapaService.getMapa(this.mapaId).subscribe(
            data => this.mapasPunto = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }




}