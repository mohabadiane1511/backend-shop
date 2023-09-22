import { Component, OnInit } from '@angular/core';
import { NavService } from './../../../shared/service/nav.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, zoomOut, zoomIn, fadeIn, bounceIn } from 'ng-animate';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../../shared/service/apilink.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  public right_side_bar: boolean;
  public layoutType: string = 'RTL';
  public layoutClass: boolean = false;
  public closeResult: string;

  nom: any;
  prix: any;
  msgsuccess: any;
  msgerror: any;
  msgsuccessdel: any;
  msgerrordel: any;
  msgsuccessmodif: any;
  msgerrormodif: any;
  zone: any;
  idDel: string = '';
  isvisible: boolean = true;
  inputModif: any;
  items = [];
  pageOfItems: Array<any>;

  constructor(public navServices: NavService, private modalService: NgbModal, private http: HttpClient, private linkService: ApilinkService) { }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  public rightSidebar($event) {
    this.right_side_bar = $event
  }

  public clickRtl(val) {
    if (val === 'RTL') {
      document.body.className = 'rtl';
      this.layoutClass = true;
      this.layoutType = 'LTR';
    } else {
      document.body.className = '';
      this.layoutClass = false;
      this.layoutType = 'RTL';
    }
  }

  ngOnInit(): void {
    this.listerZone();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    console.log(this.pageOfItems);
  }

  addZone() {
    this.msgerror = "";
    this.msgsuccess = "";

    if (this.nom == "" || this.nom === null || this.nom === undefined ||
      this.prix == "" || this.prix === null || this.prix === undefined) {

      this.msgerror = "Merci de remplir tous les champs !";
      this.msgsuccess = "";

    } else {

      this.msgerror = "";

      const headers = {
        'Content-Type': 'application/json'
      };

      const data = {
        "name": this.nom,
        "price": this.prix
      }

      this.http.post<any>(this.linkService.addelivery_endpoint, data).subscribe(res => {
        //send success response
        console.log(res);
        //alert(res.body._id);
        if (res.message == "success") {

          this.msgsuccess = "Nouvelle zone " + this.nom + " ajoutée avec succés !";
          this.msgerror = "";
          this.listerZone();
          this.nom = "";
          this.prix = "";

        } else if (res.status == "failed") {
          this.msgerror = "Cette zone existe déjà !";
          this.msgsuccess = "";
        }
      },
        (err) => {
          //send error response
          console.log(err);
          this.msgerror = "Impossible d'ajouter une zone !";
          this.msgsuccess = "";
        });

    }

  }

  listerZone() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.linkService.listdelivery_endpoint, { headers }).subscribe(data => {
      console.log(data);
      this.items = data.datas;
      //alert(this.items.length);
      if (this.items.length > 0) {
        this.items = data.datas.sort((a: any, b: any) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
      } else {

      }

      //this.listAirdrop=data.body.sort((a:any,b:any) => a.name > b.name ? 1 : -1);

    }, error => {
      console.log(error);
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

  deletepopup(content, idzone) {
    this.isvisible = true;
    this.msgerrordel = "";
    this.msgsuccessdel = "";
    this.msgsuccess = "";
    this.msgerror = "";
    this.idDel = idzone;
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

    this.http.get<any>(this.linkService.deletedelivery_endpoint + "/" + id, { headers }).subscribe(data => {
      console.log(data);

      if (data.message == "Delivery zone deleted") {
        this.msgerrordel = "";
        this.msgsuccessdel = "La suppression a été bien effectuée !";
        this.msgsuccess = "";
        this.msgerror = "";
        this.isvisible = false;
        this.listerZone();
      } else {
        this.msgerrordel = "Impossible de supprimer car cette zone est liée à un quartier!";
        this.msgsuccessdel = "";
        this.msgsuccess = "";
        this.msgerror = "";
        this.isvisible = false;
        this.isvisible = false;
      }

      //  this.listPub=data.body; 

    }, error => {
      console.log(error);
    });
  }

  modifypopup(content1, zone) {
    this.inputModif = zone;
    this.isvisible = true;
    this.msgerror = "";
    this.msgsuccess = "";
    this.msgsuccessmodif = "";
    this.msgerrormodif = "";
    console.log(zone);
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modifZone(name: string, price: number, id: string) {
    //alert(sessionStorage.getItem('idUser'));

    this.msgerrormodif = "";
    this.msgsuccessmodif = "";

    if (name == "" || name === undefined || name === null ||
      price === undefined || price === null) {

      this.msgerrormodif = "Merci de remplir tous les champs !";
      this.msgsuccessmodif = "";

    } else {

      this.msgerrormodif = "";

      const data = {
        "name": name,
        "price": price
      }

      this.http.post<any>(this.linkService.updatedelivery_endpoint + "/" + id, data).subscribe(res => {
        //send success response
        console.log(res);
        //alert(res.body._id);

        if (res.status == "success") {
          this.msgsuccessmodif = "La modification a été effectuée avec succés !";
          this.msgerrormodif = "";
          this.isvisible = false;
        } else {
          this.msgsuccessmodif = "";
          this.msgerrormodif = "Impossible de modifier la zone";
          this.isvisible = false;
        }

      }, (err) => {
        //send error response
        console.log(err);
      });

    }
  }


}
