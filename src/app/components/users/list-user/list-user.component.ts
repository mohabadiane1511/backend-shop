import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../../shared/service/apilink.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  public closeResult: string;
  searchText: string;
  msgerrordel: any;
  msgsuccessdel: any;
  idDel: string = '';
  isvisible: boolean = true;
  msgsuccessmodif: any;
  msgerrormodif: any;
  inputModif: any;
  role: any;
  items = [];
  pageOfItems: Array<any>;

  constructor(private modalService: NgbModal, private spinnerService: NgxSpinnerService, private http: HttpClient, private linkService: ApilinkService) {

  }

  ngOnInit() {
    this.role = sessionStorage.getItem('rightUser');
    this.listerFournisseur();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    console.log(this.pageOfItems);
  }

  listerFournisseur() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.spinnerService.show();

    this.http.get<any>(this.linkService.listfournisseur_endpoint, { headers }).subscribe(data => {
      console.log(data);
      // this.items = data.datas.sort((a: any, b: any) => a.supplier.name.toLowerCase() > b.supplier.name.toLowerCase() ? 1 : -1);
      this.items = data.datas;
      // console.log(this.items);
      this.spinnerService.hide();

    }, error => {
      console.log(error);
      this.spinnerService.hide();
    });
    //add by me
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

  deletepopup(content, idfournisseur) {
    //  alert(idfournisseur);
    this.isvisible = true;
    this.msgerrordel = "";
    this.msgsuccessdel = "";
    this.idDel = idfournisseur;
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

    this.http.post<any>(this.linkService.inactifournisseur_endpoint + "/" + id, { headers }).subscribe(data => {
      console.log(data);

      if (data.message == "Status set to inactif") {
        this.msgsuccessdel = "Le founisseur a été désactivé avec succés !";
        this.msgerrordel = "";
        this.isvisible = false;
        this.listerFournisseur();
      } else {
        this.msgsuccessdel = "";
        this.msgerrordel = "Ce fournisseur n'existe pas";
        this.isvisible = true;
      }

      //  this.listPub=data.body; 

    }, error => {
      console.log(error);
    });
  }

  modifypopup(content1, fournisseur) {
    this.inputModif = fournisseur;
    this.isvisible = true;
    this.msgerrordel = "";
    this.msgsuccessdel = "";
    this.msgsuccessmodif = "";
    this.msgerrormodif = "";
    console.log(fournisseur);
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  isValidEmail(email: string): boolean {
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      return (pattern.test(email));

    } catch (TypeError) {
      return false;
    }
  }


  modifFournisseur(name: string, contrat: string, id: string, tel: string) {
    this.msgerrordel = "";
    this.msgsuccessdel = "";
    this.msgsuccessmodif = "";
    this.msgerrormodif = "";

    if (name == "" || name === undefined || name === null ||
      contrat == "" || contrat === undefined || contrat === null) {

      this.msgerrormodif = "Merci de remplir tous les champs !";
      this.msgsuccessmodif = "";

    } else {

      this.msgerrormodif = "";

      const data = {
        "name": name,
        "contracttype": contrat,
        "number": tel
      }

      this.http.post<any>(this.linkService.updatefournisseur_endpoint + "/" + id, data).subscribe(res => {
        //send success response
        console.log(res);
        //alert(res.body._id);

        if (res.message == "Supplier updated" || res.message == "contrat type updated") {
          this.msgsuccessmodif = "La modification a été effectuée avec succés !";
          this.msgerrormodif = "";
          this.isvisible = false;
          this.listerFournisseur();
        } else {
          this.msgsuccessmodif = "";
          this.msgerrormodif = "Impossible de modifier ce fournisseur !";
          this.isvisible = false;
        }

      }, (err) => {
        //send error response
        console.log(err);
      });

    }

  }

}

