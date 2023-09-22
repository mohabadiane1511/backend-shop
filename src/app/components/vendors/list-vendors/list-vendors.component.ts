import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../../shared/service/apilink.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-vendors',
  templateUrl: './list-vendors.component.html',
  styleUrls: ['./list-vendors.component.scss']
})
export class ListVendorsComponent implements OnInit {
  public closeResult: string;
  items = [];
  pageOfItems: Array<any>;
  searchText: string;
  msgerrordel: any;
  msgsuccessdel: any;
  idDel: string = '';
  isvisible: boolean = true;
  msgsuccessmodif: any;
  msgerrormodif: any;
  inputModif: any;
  categorie1: string = "";
  unite: string = "";
  valcategorie1: string = "";
  listproduit: any = '';
  file_data: any;
  product_select: any;
  product_select_id: any;

  constructor(private modalService: NgbModal, private spinnerService: NgxSpinnerService, private http: HttpClient, private linkService: ApilinkService) {

  }

  ngOnInit() {
    this.listerProduit();
    this.listerProduitAdmin();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    //console.log(this.pageOfItems);
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.categorie1 = event.target.value;
    // alert(this.categorie1);
  }

  uniteSelect(event: any) {
    //update the ui
    this.unite = event.target.value;
    // alert(this.categorie1);
  }

  listerProduitAdmin() {
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

  deletepopup(content, idproduit) {
    this.isvisible = true;
    this.msgerrordel = "";
    this.msgsuccessdel = "";
    this.idDel = idproduit;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  applyDelete(id) {
    //alert(id);
    this.msgerrordel = "";
    this.msgsuccessdel = "";
    this.isvisible = true;
    const headers = {
      'Content-Type': 'application/json',
    };

    this.http.get<any>(this.linkService.deleteoffre_endpoint + "/" + id, { headers }).subscribe(data => {
      // console.log(data);

      if (data.message == "Offer deleted") {
        this.msgsuccessdel = "La suppression a été bien effectuée !";
        this.msgerrordel = "";
        this.isvisible = false;
        this.listerProduit();
      } else {
        this.msgsuccessdel = "";
        this.msgerrordel = "Impossible de supprimer cette offre";
        this.isvisible = true;
      }

      //  this.listPub=data.body; 

    }, error => {
      console.log(error);
    });
  }

  modifypopup(content1, produit) {
    this.inputModif = produit;
    this.isvisible = true;
    this.msgsuccessmodif = "";
    this.msgerrormodif = "";
    this.product_select = produit.product.name;
    this.product_select_id = produit.product.id;
    console.log(produit);
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modifProduit(idselect: string, prix: number, inventory: number, id: string) {
    //alert(this.unite);
    // alert(prix);
    // alert(inventory);
    // alert(id);
    // alert(sessionStorage.getItem('idFournisseur'));
    // alert(this.categorie1);
    //alert(id);
    this.msgerrordel = "";
    this.msgsuccessdel = "";
    this.msgsuccessmodif = "";
    this.msgerrormodif = "";
    // alert(this.categorie1);


    if (this.categorie1 == "" || this.categorie1 === undefined || this.categorie1 === null) {

      this.valcategorie1 = idselect;

    } else {

      this.valcategorie1 = this.categorie1;

    }
    //alert(this.valcategorie1);

    // if (prix === null || inventory === null || this.unite == "default" || this.unite == "") {
    if (prix === null || inventory === null) {

      this.msgerrormodif = "Merci de remplir tous les champs !";
      this.msgsuccessmodif = "";

    } else {

      this.msgerrormodif = "";
      const data = {
        "supplier": "/api/suppliers/" + sessionStorage.getItem('idFournisseur'),
        "product": "/api/products/" + this.valcategorie1,
        "inventory": inventory,
        "price": prix,
        "unit": "Kilogramme"
      }

      this.http.post<any>(this.linkService.updateoffre_endpoint + "/" + id, data).subscribe(res => {

        if (res.message == " Offer updated") {
          this.msgsuccessmodif = "La modification a été effectuée avec succés !";
          this.msgerrormodif = "";
          this.isvisible = false;
          this.listerProduit();
          this.categorie1 = "";
        } else {
          console.log(res);
          this.msgsuccessmodif = "";
          this.msgerrormodif = "Impossible de modifier ce produit !";
          this.isvisible = false;
        }

      }, (err) => {
        //send error response
        console.log(err);
      });

    }

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  listerProduit() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.spinnerService.show();
    this.http.get<any>(this.linkService.offerlist_endpoint + "/" + sessionStorage.getItem('idFournisseur'), { headers }).subscribe(data => {
      console.log(data);
      this.items = data.data;
      //this.listAirdrop=data.body.sort((a:any,b:any) => a.name > b.name ? 1 : -1);
      //console.log(this.items);
      this.spinnerService.hide();

    }, error => {
      console.log(error);
      this.spinnerService.hide();
    });
    //add by me
  }

}
