import { Component, OnInit } from '@angular/core';
import { NavService } from './../../shared/service/nav.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, zoomOut, zoomIn, fadeIn, bounceIn } from 'ng-animate';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../shared/service/apilink.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detailinvoice',
  templateUrl: './detailinvoice.component.html',
  styleUrls: ['./detailinvoice.component.scss']
})
export class DetailinvoiceComponent implements OnInit {

  public right_side_bar: boolean;
  public layoutType: string = 'RTL';
  public layoutClass: boolean = false;
  public closeResult: string;
  id: string = "";
  items = [];
  idsupplier: string = "";
  orderItem: string = "";
  pageOfItems: Array<any>;
  product_supplier: any;
  isvisible: boolean = true;


  constructor(private spinnerService: NgxSpinnerService, public navServices: NavService, private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient, private linkService: ApilinkService) { }

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

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    //console.log(this.pageOfItems);
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    //alert(this.id);
    if (this.id != "") {
      this.listerOrderItem();
    }
  }

  listerOrderItem() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.spinnerService.show();
    this.http.get<any>(this.linkService.listorderitem_endpoint + "/" + this.id, { headers }).subscribe(data => {
      console.log(data);
      this.items = data.data;
      // this.spinnerService.hide();

    }, error => {
      console.log(error);
      //this.spinnerService.hide();
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

  chooseSupplier(content, idorderitem, idsupplier) {
    this.isvisible = true;
    this.idsupplier = idsupplier;
    this.orderItem = idorderitem;
    //alert(this.idsupplier);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //
    const headers = {
      'Content-Type': 'application/json'
    };

    this.spinnerService.show();
    this.http.get<any>(this.linkService.productbysupplier_endpoint + "/" + this.idsupplier, { headers }).subscribe(data => {
      console.log(data);
      this.product_supplier = data.datas;
      //this.spinnerService.hide();

    }, error => {
      console.log(error);
      //this.spinnerService.hide();
    });
    //add by me
  }

  engageSupplier(idoffre, idorderitem) {
    // alert(idoffre);
    // alert(idorderitem);
    this.isvisible = true;

    const headers = {
      'Content-Type': 'application/json'
    };

    this.spinnerService.show();
    this.http.post<any>(this.linkService.choosesupplier_endpoint + "/" + idorderitem + "/" + idoffre, { headers }).subscribe(data => {
      console.log(data);
      this.listerOrderItem();
      this.isvisible = false;
      //this.product_supplier=data.datas;
      //this.spinnerService.hide();

    }, error => {
      console.log(error);
      //this.spinnerService.hide();
    });
    //add by me

  }

}
