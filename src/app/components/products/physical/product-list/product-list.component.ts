import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../../../shared/service/apilink.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

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
  categorie1: any = '';
  listcategorie: any = '';
  file_data: any;
  category_select: any;
  category_select_id: any;

  constructor(private modalService: NgbModal, private spinnerService: NgxSpinnerService, private http: HttpClient, private linkService: ApilinkService) {

  }

  ngOnInit() {
    this.listerProduit();
    this.listerCategorie();
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

  listerCategorie() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.linkService.listcategorie_endpoint, { headers }).subscribe(data => {
      //console.log(data);
      this.listcategorie = data;
    }, error => {
      //console.log(error);
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
    this.isvisible = true;
    const headers = {
      'Content-Type': 'application/json',
    };

    this.http.get<any>(this.linkService.deleteproduit_endpoint + "/" + id, { headers }).subscribe(data => {
      console.log(data);

      if (data.message == "Product Deleted") {
        this.msgsuccessdel = "La suppression a été bien effectuée !";
        this.msgerrordel = "";
        this.isvisible = false;
        this.listerProduit();
      } else if (data.message == "This product does not exists !") {
        this.msgsuccessdel = "";
        this.msgerrordel = "Ce produit n'existe pas";
        this.isvisible = true;
      }

      //  this.listPub=data.body; 

    }, error => {
      console.log(error);
    });
  }

  fileChange(event: any) {

    const file: File = event.target.files[0];
    //check whether file is selected or not
    if (file) {
      console.log(file);
      let formData = new FormData();
      formData.append('file', file, file.name);
      this.file_data = formData;
    } else {
      this.file_data = "";
    }

  }

  modifypopup(content1, produit) {
    this.inputModif = produit;
    this.isvisible = true;
    this.msgerrordel = "";
    this.msgsuccessdel = "";
    this.msgsuccessmodif = "";
    this.msgerrormodif = "";
    this.category_select = produit.category.name;
    this.category_select_id = produit.category.id;
    console.log(produit);
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modifProduit(name: string, image: string, prix: number, categorie: string, description: string, id: string) {
    // alert(this.file_data);
    // console.log(image);

    this.msgerrordel = "";
    this.msgsuccessdel = "";
    this.msgsuccessmodif = "";
    this.msgerrormodif = "";
    // alert(this.categorie1);


    if (this.categorie1 == "" || this.categorie1 === undefined || this.categorie1 === null) {

      this.categorie1 = this.category_select_id;

    }

    if (name == "" || name === undefined || name === null || prix === undefined || prix === null || this.categorie1 == "" || this.categorie1 === undefined || this.categorie1 === null || description == "" || description === undefined || description === null) {

      this.msgerrormodif = "Merci de remplir tous les champs requis !";
      this.msgsuccessmodif = "";

    } else {

      if (this.file_data == "" || this.file_data === undefined || this.file_data === null) {
        this.msgerrormodif = "";

        const data = {
          "name": name,
          "image": image,
          "price": prix,
          "description": description,
          "category": "/api/categories/" + this.categorie1
        }

        this.http.post<any>(this.linkService.updateproduit_endpoint + "/" + id, data).subscribe(res => {
          //send success response
          console.log(res);
          //alert(res.body._id);

          if (res.message == "Product updated") {
            this.msgsuccessmodif = "La modification a été effectuée avec succés !";
            this.msgerrormodif = "";
            this.isvisible = false;
            this.listerProduit();
            this.categorie1 = "";
          } else {
            this.msgsuccessmodif = "";
            this.msgerrormodif = "Impossible de supprimer ce produit !";
            this.isvisible = false;
          }

        }, (err) => {
          //send error response
          console.log(err);
        });
      } else {

        //if image is present

        this.http.post<any>(this.linkService.uploadimageproduit_endpoint, this.file_data).subscribe(res => {
          //send success response
          console.log(res);
          //alert(res.body._id);
          if (res.filename != "") {
            const data = {
              "name": name,
              "image": res.filename,
              "price": prix,
              "description": description,
              "category": "/api/categories/" + this.categorie1
            }
            this.http.post<any>(this.linkService.updateproduit_endpoint + "/" + id, data).subscribe(res1 => {
              console.log(res1);
              if (res1.message == "Product updated") {
                this.msgsuccessmodif = "La modification a été effectuée avec succés !";
                this.msgerrormodif = "";
                this.categorie1 = "";
                this.file_data = "";
                this.isvisible = false;
                this.listerProduit();
              } else {
                this.msgsuccessmodif = "";
                this.msgerrormodif = "Impossible de modifier ce produit !";
                this.isvisible = false;
              }

            }, (err) => {
              //send error response
              console.log(err);
            });

          }
        },
          (err) => {
            //send error response
            console.log(err);
          });

        //if image is present 

      }

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
    this.http.get<any>(this.linkService.listproduit_endpoint, { headers }).subscribe(data => {
      console.log(data);
      this.items = data.products.sort((a: any, b: any) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
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
