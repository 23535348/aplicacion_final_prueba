import {Component,Directive, OnInit, HostListener, Input} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { LoginComponent } from '../../components/login/login.component';
import { CeiboShare } from '../../components/botones-compartir/ng2-social-share';
import {PuntoService} from '../../_services/punto/punto.service';
@Component({
	selector: 'home',
	templateUrl: 'app/view/home/home.component.html'
})

@Directive({
    selector: '[ceiboShare]'
})
export class HomeComponent implements OnInit {

    public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
    public imageUrl = 'https://avatars2.githubusercontent.com/u/10674541?v=3&s=200';
    private puntos = [];
	private isLoading = true;

	private punto = {};
	private isEditing: number = 1;
    private isAdd = false;

    private addPuntoForm: FormGroup;
	private nombre_punto_titulo = new FormControl("", Validators.required);
    private punto_x = new FormControl("", Validators.required);
    private punto_y = new FormControl("", Validators.required);
    private usuario = new FormControl("", Validators.required);
    private foto_ranking = new FormControl("", Validators.required);
    private direccion_comentario = new FormControl("", Validators.required);

	private infoMsg = { body: "", type: "info"};

	constructor(private http: Http,
				private puntoService : PuntoService,
				private formBuilder: FormBuilder) {	}

	ngOnInit() {

        this.getPuntos();

		this.addPuntoForm = this.formBuilder.group({
            nombre_punto_titulo: this.nombre_punto_titulo,
            punto_x: this.punto_x,
            punto_y: this.punto_y,
            usuario: this.usuario,
            foto_ranking: this.foto_ranking,
            direccion_comentario: this.direccion_comentario
		});
	}

    getPuntos() {
        this.puntoService.getPuntos().subscribe(
            data => this.puntos = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    addPunto() {
        this.puntoService.addPunto(this.addPuntoForm.value).subscribe(
            res => {
                var newPunto = res.json();
                this.puntos.push(newPunto);
                this.addPuntoForm.reset();
                this.sendInfoMsg("Se agrego el punto Correctamente.", "success");
            },
            error => console.log(error)
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

	sendInfoMsg(body, type, time = 3000) {
		this.infoMsg.body = body;
		this.infoMsg.type = type;
		window.setTimeout(() => this.infoMsg.body = "", time);
	}

}