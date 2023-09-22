import { Component, OnInit } from '@angular/core';
import { NavService } from './../../../shared/service/nav.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, zoomOut, zoomIn, fadeIn, bounceIn } from 'ng-animate';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../../shared/service/apilink.service';

@Component({
  selector: 'app-quartier',
  templateUrl: './quartier.component.html',
  styleUrls: ['./quartier.component.scss']
})
export class QuartierComponent implements OnInit {

  public right_side_bar: boolean;
  public layoutType: string = 'RTL';
  public layoutClass: boolean = false;
  public closeResult: string;

  nom_zone: any;
  nom_quartier: any;
  msgsuccess: any;
  msgerror: any;
  msgsuccessdel: any;
  msgerrordel: any;
  msgsuccessmodif: any;
  msgerrormodif: any;
  zones: [] = [];
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
    this.listerQuartier();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    console.log(this.pageOfItems);
  }

  addQuartier() {
    this.msgerror = "";
    this.msgsuccess = "";

    if (this.nom_zone == "" || this.nom_zone === null || this.nom_zone === undefined ||
      this.nom_quartier == "" || this.nom_quartier === null || this.nom_quartier === undefined) {

      this.msgerror = "Merci de remplir tous les champs !";
      this.msgsuccess = "";

    } else {

      this.msgerror = "";

      const headers = {
        'Content-Type': 'application/json'
      };

      const data = {
        "name": this.nom_quartier
      }

      this.http.post<any>(this.linkService.addcity_endpoint + "/" + this.nom_zone, data).subscribe(res => {
        //send success response
        console.log(res);
        //alert(res.body._id);
        if (res.message == "success") {

          this.msgsuccess = "Nouveau quartier " + this.nom_quartier + " ajoutée avec succés !";
          this.msgerror = "";
          this.listerQuartier();
          this.nom_quartier = "";
          this.nom_zone = "";

        } else if (res.status == "failed") {
          this.msgerror = "Ce quartier existe déjà !";
          this.msgsuccess = "";
        }
      },
        (err) => {
          //send error response
          console.log(err);
          this.msgerror = "Impossible d'ajouter un quartier !";
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
      this.zones = data.datas;
      //alert(this.zones.length);
      if (this.zones.length > 0) {
        this.zones = data.datas.sort((a: any, b: any) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
      } else {

      }

    }, error => {
      console.log(error);
    });
    //add by me
  }

  listerQuartier() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.linkService.listcity_endpoint, { headers }).subscribe(data => {
      console.log(data);
      this.items = data.data;
      //alert(this.zones.length);
      if (this.items.length > 0) {
        this.items = data.data.sort((a: any, b: any) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
      } else {

      }

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

  deletepopup(content, idquartier) {
    this.isvisible = true;
    this.msgerrordel = "";
    this.msgsuccessdel = "";
    this.msgsuccess = "";
    this.msgerror = "";
    this.idDel = idquartier;
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

    this.http.get<any>(this.linkService.deletecity_endpoint + "/" + id, { headers }).subscribe(data => {
      console.log(data);

      if (data.message == "City deleted") {
        this.msgerrordel = "";
        this.msgsuccessdel = "La suppression a été bien effectuée !";
        this.msgsuccess = "";
        this.msgerror = "";
        this.isvisible = false;
        this.listerQuartier();
      } else {
        this.msgerrordel = "Impossible de supprimer !";
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

  modifypopup(content1, quartier) {
    this.inputModif = quartier;
    this.isvisible = true;
    this.msgerror = "";
    this.msgsuccess = "";
    this.msgsuccessmodif = "";
    this.msgerrormodif = "";
    console.log(quartier);
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modifZone(name: string, zone: string, id: string) {
    //alert(sessionStorage.getItem('idUser'));
    //alert(id);
    // alert(zone);
    this.msgerrormodif = "";
    this.msgsuccessmodif = "";
    //alert(zone);

    if (name == "" || name === undefined || name === null ||
      zone === undefined || zone === null || zone == "") {

      this.msgerrormodif = "Merci de remplir tous les champs !";
      this.msgsuccessmodif = "";

    } else {

      this.msgerrormodif = "";

      const data = {
        "name": name
      }

      this.http.post<any>(this.linkService.updatecity_endpoint + "/" + id + "/" + zone, data).subscribe(res => {
        //send success response
        console.log(res);
        //alert(res.body._id);

        if (res.message == "City updated" || res.message == "City  delivery zone  updated") {
          this.msgsuccessmodif = "La modification a été effectuée avec succés !";
          this.msgerrormodif = "";
          this.isvisible = false;
          this.listerQuartier();
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
