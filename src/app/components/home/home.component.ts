import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {LoginService} from '../../_services/login/login.service';
import { Router, NavigationEnd } from '@angular/router';
import {PuntoService} from '../../_services/punto/punto.service';
import {ValoracionPuntoService} from '../../_services/punto/valoracion.punto.service';
@Component({
	selector: 'home',
    styleUrls:  ['app/view/mapa/mapa.css'],
	templateUrl: 'app/view/home/home.component.html'
})


export class HomeComponent implements OnInit {

    public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
    public imageUrl = 'https://avatars2.githubusercontent.com/u/10674541?v=3&s=200';
    private puntos = [];
    private puntosFavoritos = [];
	private isLoading = true;
	private currentUser = localStorage.getItem('currentUser');
    private currentUserId = localStorage.getItem('currentUserId');
	private punto = {};
	private  ranking: number =1;
	private isEditing: number = 1;
    private isAdd = false;

    private addPuntoForm: FormGroup;
	private nombre_punto_titulo = new FormControl("", Validators.required);
    private punto_latitude = new FormControl("", Validators.required);
    private punto_longitude = new FormControl("", Validators.required);
    private usuario = new FormControl("", Validators.required);
    private usuarioNombre = new FormControl("", Validators.required);
    private favoritos : number = 0;
    private foto_ranking = new FormControl("", Validators.required);
    private direccion_comentario = new FormControl("", Validators.required);
    private returnUrl: string;
	private infoMsg = { body: "", type: "info"};
	constructor(private http: Http,
				private puntoService : PuntoService,
                private router: Router,
				private valorarionPuntoService : ValoracionPuntoService,
				private formBuilder: FormBuilder,
                private loginService : LoginService
    ) {	}

	ngOnInit() {

        this.getPuntos();
		this.addPuntoForm = this.formBuilder.group({
            nombre_punto_titulo: this.nombre_punto_titulo,
            punto_latitude: this.punto_latitude,
            punto_longitude: this.punto_longitude,
            usuario: this.usuario,
            usuarioNombre : this.usuarioNombre,
            favoritos: this.favoritos ,
            foto_ranking: this.foto_ranking,
            ranking : this.ranking,
            direccion_comentario: this.direccion_comentario

		});
	}
    // Gestion de puntos dash
    getPuntos() {
        this.puntoService.getPuntos().subscribe(
            data => this.puntos = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    enableAdd() {
        this.isEditing= 2;

    }

    enableEditing(punt) {
        this.isEditing = 3;
        this.punto = punt;
    }

    cancelEditing() {
        this.isEditing = 1;
        this.punto = {};
        this.sendInfoMsg("Cancelo la edicion del punto.", "warning");
        // reload the cats to reset the editing
        this.getPuntos();
    }

    editPunto(punto) {
        this.puntoService.editPunto(punto).subscribe(
            res => {
                this.isEditing = 1;
                this.punto = punto;

                this.sendInfoMsg("Edicion correcta del punto.", "success");
            },
            error => console.log(error)
        );
    }

    deletePunto(punto) {
        if(window.confirm("Esta Seguro que quiere eliminar el punto?")) {
            this.puntoService.deletePunto(punto).subscribe(
                res => {
                    var pos = this.puntos.map(punto => { return punto._id }).indexOf(punto._id);
                    this.puntos.splice(pos, 1);
                    this.sendInfoMsg("Item Elminado correctamente.", "success");
                },
                error => console.log(error)
            );
        }
    }

    //Favoritos
    favoritoPunto(punto, usuario) {


            this.valorarionPuntoService.favoritoPunto(punto, usuario).subscribe(
                res => {
                    this.isEditing = 1;
                    this.punto = punto;
                    let datos = res;
                    if( datos === null){
                        this.valorarionPuntoService.addFavoritoPunto(punto , usuario).subscribe(
                            res => {
                                this.sendInfoMsg("Se agrego el Favorito Correctamente.", "success");
                                this.valorarionPuntoService.addFavoritoPuntoVoto(punto).subscribe(
                                    res => {
                                        this.punto = punto;
                                    },
                                    error => console.log(error)
                                );
                                alert('Se agrego el Nuevo Favorito Correctamente');
                                },
                            error => console.log(error)
                        );
                    }else{

                        this.valorarionPuntoService.addFavoritoPuntoVoto(punto).subscribe(
                            res => {
                                this.punto = punto;
                                alert('Se agrego el Voto Correctamente');
                            },
                            error => console.log(error)
                        );

                    }

                    this.sendInfoMsg("Edicion correcta del punto.", "success");
                },
                error => console.log(error)
            );
    }

    favorito(){

        this.returnUrl = 'favorito';
        this.router.navigate([this.returnUrl]);

    }

    mapaIr(id_mapa){
        this.returnUrl = 'mapa/'+id_mapa;
        this.router.navigate([this.returnUrl]);
    }

    getPuntosFavoritos(punto) {
        this.valorarionPuntoService.getPuntoFavoritos(punto).subscribe(
            data => this.puntosFavoritos = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

	sendInfoMsg(body, type, time = 3000) {
		this.infoMsg.body = body;
		this.infoMsg.type = type;
		window.setTimeout(() => this.infoMsg.body = "", time);
	}



}