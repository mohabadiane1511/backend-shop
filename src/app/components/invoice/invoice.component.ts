import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../shared/service/apilink.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  public closeResult: string;
  items = [];
  pageOfItems: Array<any>;
  commandeID: string = "";
  order: any;
  orderFirst: any;
  fileName = 'ExcelSheet.xlsx';

  constructor(private modalService: NgbModal, private spinnerService: NgxSpinnerService, private http: HttpClient, private linkService: ApilinkService) {

  }

  ngOnInit() {
    this.listerCommande();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    //console.log(this.pageOfItems);
  }

  listerCommande() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.spinnerService.show();
    this.http.get<any>(this.linkService.listcommande_endpoint, { headers }).subscribe(data => {
      console.log(data);
      this.items = data.data;
      this.spinnerService.hide();

    }, error => {
      console.log(error);
      this.spinnerService.hide();
    });
    //add by me
  }

  annulerCommande(id) {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.spinnerService.show();
    this.http.get<any>(this.linkService.cancelorder_endpoint + "/" + id, { headers }).subscribe(data => {
      console.log(data);
      this.listerCommande();
      this.spinnerService.hide();

    }, error => {
      console.log(error);
      this.spinnerService.hide();
    });
  }


  terminerCommande(id) {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.spinnerService.show();
    this.http.get<any>(this.linkService.terminerorder_endpoint + "/" + id, { headers }).subscribe(data => {
      console.log(data);
      this.listerCommande();
      this.spinnerService.hide();

    }, error => {
      console.log(error);
      this.spinnerService.hide();
    });
  }

  openPopup(content, idcommande) {
    this.commandeID = idcommande;
    //alert(this.idsupplier);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //
    const headers = {
      'Content-Type': 'application/json'
    };

    this.spinnerService.show();
    this.http.get<any>(this.linkService.listorderitem_endpoint + "/" + idcommande, { headers }).subscribe(data => {

      this.order = data.data;
      this.orderFirst = data.data[0];
      console.log(this.orderFirst);
      this.spinnerService.hide();

    }, error => {
      console.log(error);
      this.spinnerService.show();
    });
    //add by me
  }

  exportExcel() {
    /* table id is passed over here */
    let element = document.getElementById('excel-table1');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
