import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { LoginComponent } from '../../components/login/login.component';

import {CatService} from '../../_services/cat.service';

@Component({
	selector: 'home',
	templateUrl: 'app/view/home/home.component.html'
})

export class HomeComponent implements OnInit {

	private cats = [];
	private isLoading = true;

	private cat = {};
	private isEditing = false;

	private addCatForm: FormGroup;
	private name = new FormControl("", Validators.required);
	private age = new FormControl("", Validators.required);
	private weight = new FormControl("", Validators.required);

	private infoMsg = { body: "", type: "info"};

	constructor(private http: Http,
				private catService: CatService,
				private formBuilder: FormBuilder) {	}

	ngOnInit() {
		this.getCats();

		this.addCatForm = this.formBuilder.group({
			name: this.name,
			age: this.age,
			weight: this.weight
		});
	}

	getCats() {
		this.catService.getCats().subscribe(
			data => this.cats = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	addCat() {
		this.catService.addCat(this.addCatForm.value).subscribe(
			res => {
				var newCat = res.json();
				this.cats.push(newCat);
				this.addCatForm.reset();
				this.sendInfoMsg("item added successfully.", "success");
			},
			error => console.log(error)
		);
	}

	enableEditing(cat) {
		this.isEditing = true;
		this.cat = cat;
	}

	cancelEditing() {
		this.isEditing = false;
		this.cat = {};
		this.sendInfoMsg("item editing cancelled.", "warning");
		// reload the cats to reset the editing
		this.getCats();
	}

	editCat(cat) {
		this.catService.editCat(cat).subscribe(
			res => {
				this.isEditing = false;
				this.cat = cat;
				this.sendInfoMsg("item edited successfully.", "success");
			},
			error => console.log(error)
		);
	}

	deleteCat(cat) {
		if(window.confirm("Are you sure you want to permanently delete this item?")) {
			this.catService.deleteCat(cat).subscribe(
				res => {
					var pos = this.cats.map(cat => { return cat._id }).indexOf(cat._id);
					this.cats.splice(pos, 1);
					this.sendInfoMsg("item deleted successfully.", "success");
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