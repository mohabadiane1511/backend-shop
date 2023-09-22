import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../../shared/service/apilink.service';
import { Md5 } from 'ts-md5/dist/md5';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  nom_entreprise: any;
  type: any;
  email: any;
  password: any;
  passwordclair: any;
  msgerror: any;
  msgsuccess: any;
  tel: string = "";


  md5 = new Md5();


  constructor(private http: HttpClient, private spinnerService: NgxSpinnerService, private linkService: ApilinkService) {

  }

  ngOnInit() {
    //alert(this.md5.appendStr('hello').end());
    this.password = "";
    this.passwordclair = "";
  }

  isValidEmail(email: string): boolean {
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      return (pattern.test(email));

    } catch (TypeError) {
      return false;
    }
  }

  addFournisseur() {
    this.msgerror = "";
    this.msgsuccess = "";

    if (
      this.nom_entreprise === undefined || this.nom_entreprise == "" || this.nom_entreprise === null ||
      this.type === undefined || this.type == "" || this.type === null ||
      this.email === undefined || this.email == "" || this.email === null ||
      this.password === undefined || this.password == "" || this.password === null || this.tel == "") {

      this.msgerror = "Merci de remplir tous les champs !";
      this.msgsuccess = "";

    } else if (this.isValidEmail(this.email) != true) {

      this.msgerror = "L'adresse email est incorrecte !";

    } else {

      this.spinnerService.show();

      this.msgerror = "";

      const headers = {
        'Content-Type': 'application/json'
      };
      this.passwordclair = this.password;
      this.password = Md5.hashStr(this.password);
      // alert(this.password);

      const data = {
        "email": this.email,
        "password": this.password,
        "name": this.nom_entreprise,
        "contracttype": this.type,
        "passwordclair": this.passwordclair,
        "number": this.tel,
        "status": "Actif"

      }
      this.http.post<any>(this.linkService.addfournisseur_endpoint, data, { headers: headers }).subscribe(res1 => {
        console.log(res1);
        if (res1.message == "success") {

          this.msgsuccess = "Nouveau fournisseur " + this.nom_entreprise + " ajouté avec succés !";
          this.msgerror = "";
          this.email = "";
          this.password = "";
          this.nom_entreprise = "";
          this.type = "";


        } else if (res1.message == "Supplier already exists !") {

          this.msgerror = "Le nom du fournisseur ou l'adresse email existe déjà !";
          this.password = "";
          this.msgsuccess = "";

        } else {

        }

        this.spinnerService.hide();

      }, (err) => {

        this.msgsuccess = "Nouveau fournisseur " + this.nom_entreprise + " ajouté avec succés !";
        this.msgerror = "";
        this.email = "";
        this.password = "";
        this.nom_entreprise = "";
        this.type = "";
        this.spinnerService.hide();
      });
    }
  }

}
