import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../../shared/service/apilink.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-vendors',
  templateUrl: './create-vendors.component.html',
  styleUrls: ['./create-vendors.component.scss']
})
export class CreateVendorsComponent implements OnInit {
  listproduit: any = "";
  nom: string = "";
  prix: number = 0;
  unite: string = "";
  quantite: number = 0;
  produit: string = "";
  msgerror: any;
  msgsuccess: any;
  msgerrorcat: any;
  msgsuccesscat: any;

  constructor(private http: HttpClient, private spinnerService: NgxSpinnerService, private linkService: ApilinkService) {

  }

  ngOnInit() {
    // alert(sessionStorage.getItem('idUser'));
    this.listProduit();
  }

  selectChangeHandler(event: any) {
    this.produit = event.target.value;
  }

  uniteSelect(event: any) {
    this.unite = event.target.value;

  }

  listProduit() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.linkService.listproduit_endpoint, { headers }).subscribe(data => {
      console.log(data);
      this.listproduit = data.products;
    }, error => {
      console.log(error);
    });
  }

  addOffre() {

    this.msgerror = "";
    this.msgsuccess = "";

    if (this.produit == "default" || this.produit == "" || this.prix == 0 || this.prix === null || this.quantite === null || this.quantite == 0 || this.unite == "default" || this.unite == "") {

      this.msgerror = "Merci de remplir tous les champs !";
      this.msgsuccess = "";

    } else {

      this.spinnerService.show();

      this.msgerror = "";

      const headers = {
        'Content-Type': 'application/json'
      };

      const data = {
        "supplier": "/api/suppliers/" + sessionStorage.getItem('idFournisseur'),
        "product": "/api/products/" + this.produit,
        "inventory": this.quantite,
        "price": this.prix,
        "unit": this.unite
      }



      this.http.post<any>(this.linkService.addoffre_endpoint + "/" + this.produit + "/" + sessionStorage.getItem('idFournisseur'), data, { headers: headers }).subscribe(res1 => {
        console.log(res1);
        if (res1.message == " Offer created") {

          this.msgerror = "";
          this.msgsuccess = "L'offre a été créée avec succés !";


        } else {
          this.msgerror = "Ce produit a déjà été ajouté à une offre !";
          this.msgsuccess = "";
        }

        this.spinnerService.hide();

      }, (err) => {
        console.log(err);
        this.spinnerService.hide();
      });

    }
  }

}