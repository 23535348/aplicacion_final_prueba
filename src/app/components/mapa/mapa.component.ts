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
    private  positions =[];
    private   mapOptions = {};

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
            data =>{
                this.mapasPunto = data;
                var myLatlng = data.punto_latitude+','+data.punto_longitude;
                this.mapOptions = {
                    zoom: 13,
                    center: myLatlng,
                    mapTypeId: 'satellite'
                };

            }

            ,
            error => console.log(error),
            () => this.isLoading = false
        );
    }


    // manejo de mapas

    onMapReady(map) {
        console.log('map', map);
        console.log('markers', map.markers);  // to get all markers as an array
    }
    onIdle(event) {
        console.log('map', event.target);
    }
    onMarkerInit(marker) {
        console.log('marker', marker);
    }
    onMapClick(event) {
        this.positions.push(event.latLng);
        event.target.panTo(event.latLng);
    }




}