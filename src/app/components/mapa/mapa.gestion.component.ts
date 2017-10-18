import {Component, Directive, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { RouterLinkWithHref , ActivatedRoute , Params  } from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ValoracionPuntoService} from '../../_services/punto/valoracion.punto.service';
import {PuntoService} from '../../_services/punto/punto.service';
import {MapaService} from '../../_services/mapa/mapa.service';
import {CategoriaService} from '../../_services/categorias/categoria.service';
import { Router } from '@angular/router';
import {UploaderFileDirective} from '../directive/carga_de_archivo/uploader.file.directive';



@Component({
	selector: 'mapa',
    styleUrls:  ['app/view/mapa/mapa.css'],
	templateUrl: 'app/view/mapa/mapa.gestion.component.html',

})


export class MapaGestionComponent implements OnInit {

    public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
    public imageUrl = 'https://avatars2.githubusercontent.com/u/10674541?v=3&s=200';
    private mapasPunto = [];
    private puntos = [];
	private isLoading = true;
	private mapaPunto = {};
	private isGestion: number = 1;
    private isAdd = false;
    private mapaId: string;
    private  categoriasNueva: number = 0;
    private  positions =[];
    private  mapOptions = {};
    private  markerMap ={};
    private categorias = [];
    private currentUser = localStorage.getItem('currentUser');
    private currentUserId = localStorage.getItem('currentUserId');
    private  var_longitud : string;// localStorage.getItem('longitudeFormAdd');
    private  var_latitud : string;//  localStorage.getItem('latitudeFormAdd');
    private returnUrl: string;
	private infoMsg = { body: "", type: "info"};

    // verificacion
    private addMapaForm: FormGroup;
    //formulario de registro
    private addPuntoForm: FormGroup;
    private nombre_punto_titulo = new FormControl("", Validators.required);
    private punto_latitude = new FormControl("", Validators.required);
    private ranking: number = 1;
    private punto_longitude = new FormControl("", Validators.required);
    private usuario = new FormControl("", Validators.required);
    private usuarioNombre = new FormControl("", Validators.required);
    private categoria = new FormControl("", Validators.required);
    private favoritos : number = 0;
    private foto_ranking = new FormControl("", Validators.required);
    private direccion_comentario = new FormControl("", Validators.required);

	constructor(private http: Http,
				private valoracionPuntoService : ValoracionPuntoService,
                private mapaService : MapaService,
                private puntoService : PuntoService,
                private activatedRoute: ActivatedRoute,
                private  categoriaService : CategoriaService,
                private router: Router,
                private formBuilder: FormBuilder
) {	}

	ngOnInit() {

        this.getMapaGestion();
        this.getCategorias();
        this.addMapaForm = this.formBuilder.group({
            punto_latitude: this.punto_latitude,
            punto_longitude: this.punto_longitude,
            ranking: this.ranking
        });
        this.addPuntoForm = this.formBuilder.group({
            nombre_punto_titulo: this.nombre_punto_titulo,
            punto_latitude: this.punto_latitude,
            punto_longitude: this.punto_longitude,
            usuario: this.usuario,
            usuarioNombre : this.usuarioNombre,
            favoritos: this.favoritos ,
            foto_ranking: this.foto_ranking,
            direccion_comentario: this.direccion_comentario,
            categoria : this.categoria,
            ranking : this.ranking
        });
    }
    getMapaGestion() {
        this.mapOptions = {
            zoom: 13
        };
        this.markerMap = {};
        var onSuccess = function(position) {
         /* alert('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');*/

            var pos = { latitude : position.coords.latitude, longitude: position.coords.longitude};
            var myLatlng = position.coords.latitude+','+ position.coords.longitude;


           // this.var_longitud = position.coords.longitude;
            //this.var_latitud =  position.coords.latitude;
            this.markerMap = {
                id: 0,
                coords: {
                    latitude: position.coords.latitude,
                    longitude:  position.coords.longitude
                },
                options: {
                    draggable: true
                }
            };

            this.mapOptions = {
                zoom: 13,
                center: myLatlng
            };
            //alert('datos'+this.mapOptions);


        };

        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }

       navigator.geolocation.getCurrentPosition(onSuccess, onError);
        /*   navigator.geolocation.getCurrentPosition(function(position) {
            var pos = { latitude : position.coords.latitude, longitude: position.coords.longitude};
            var myLatlng = position.coords.latitude+','+ position.coords.longitude;

            this.mapOptions = {
                zoom: 13,
                center: myLatlng
            };
            this.onMarkerInit(pos);
            this.var_longitud = position.coords.longitude;
             this.var_latitud =  position.coords.latitude;
            this.markerMap = {
                id: 0,
                coords: {
                    latitude: position.coords.latitude,
                    longitude:  position.coords.longitude
                },
                options: {
                    draggable: true
                }
            };
        })

*/

    }
    getCategorias(){
        this.categoriaService.getCats().subscribe(
            data => this.categorias = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }
    addPuntoVerificar(){
        this.isGestion = 2;
        this.puntoService.addPuntoVerificar(this.addMapaForm.value).subscribe(
            res => {
                let collentionsMapa = res.json();
                // alert(collentionsUser.length);
                if(collentionsMapa === null){
                    alert("Punto Disponible");
                    localStorage.setItem('longitudeFormAdd', this.punto_longitude.value);
                    localStorage.setItem('latitudeFormAdd', this.punto_latitude.value);
                    this.isGestion = 2;
                    this.getCategorias();
                }else{
                   alert('Punto no disponible');
                }
            },
            error => console.log(error)
        );
    }
    enableAddForm() {
        this.categoriasNueva= 1;
    }
    addPunto() {

       this.puntoService.addPunto(this.addPuntoForm.value).subscribe(
            res => {
                var newPunto = res.json();
                if(this.categoriasNueva === 1) {
                    this.categoriaService.addCat(this.addPuntoForm.value).subscribe(
                        res => {
                            var newCategoria = res.json();
                            this.categoriasNueva= 0;
                            alert('Procesado');
                        },
                        error => console.log(error)
                    );
                }
                alert('Guardado');
                localStorage.setItem('longitudeFormAdd','');
                localStorage.setItem('latitudeFormAdd', '');
                this.isGestion = 1;
            },
            error => console.log(error)
        );
    }
    rankingVoto(valor) {
        this.ranking = valor;
        alert('Su voto es: '+this.ranking);
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
    cancelEditing() {
        this.returnUrl = 'home';
        this.router.navigate([this.returnUrl]);
    }

}