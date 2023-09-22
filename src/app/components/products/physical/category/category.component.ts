import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../../../shared/service/apilink.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public closeResult: string;
  //items: any;
  items = [];
  pageOfItems: Array<any>;
  msgerrorcat:any;
  msgsuccesscat:any;
  msgerrorcatmodif:any;
  msgsuccesscatmodif:any;
  msgerrorcatpop:any;
  msgsuccesscatpop:any;
  nom_categorie:any;
  searchText: string;
  idDel: string='';
  isvisible: boolean=true;
  inputModif:any;

  constructor(private modalService: NgbModal,  private spinnerService: NgxSpinnerService, private http: HttpClient, private linkService: ApilinkService) {
    
  }

  ngOnInit() {
    this.listerCategorie();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    console.log(this.pageOfItems);
  }

  deletepopup(content, idcategorie) {
    this.isvisible=true;
    this.msgerrorcatpop="";
    this.msgsuccesscatpop="";
    this.msgsuccesscat="";
    this.msgerrorcat="";
    this.idDel=idcategorie;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  modifypopup(content1, categorie) {
    this.inputModif=categorie;
    this.isvisible=true;
    this.msgerrorcatpop="";
    this.msgsuccesscatpop="";
    this.msgsuccesscat="";
    this.msgerrorcat="";
    console.log(categorie);
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  addCatgorie(){

    this.msgerrorcat="";
    this.msgsuccesscat="";
      
      if(this.nom_categorie=="" || this.nom_categorie===null || this.nom_categorie===undefined){

        this.msgerrorcat="Merci de remplir le champ !";
        this.msgsuccesscat="";

      }else{

        this.msgerrorcat="";

        const headers = { 
          'Content-Type': 'application/json'
        };

        const data = {
          "name": this.nom_categorie
        }

        this.http.post<any>(this.linkService.addcategorie_endpoint, data).subscribe(res => {
          //send success response
              console.log(res);
               //alert(res.body._id);
                if(res.message=="success"){

                  this.msgsuccesscat="Nouvelle catégorie "+this.nom_categorie+" ajoutée avec succés !";
                  this.msgerrorcat="";
                  this.listerCategorie();
                  this.nom_categorie="";

                }else if(res.message=="Category already exists !"){
                  this.msgerrorcat="Cette catégorie existe déjà !";
                  this.msgsuccesscat="";
                } else{

                }                      
        }, 
        (err) => {
            //send error response
              console.log(err);
        });

      }

  }

  listerCategorie(){
    const headers = { 
      'Content-Type': 'application/json'
      };

    this.spinnerService.show();

    this.http.get<any>(this.linkService.listcategorie_endpoint,  {headers} ).subscribe(data => {
        //console.log(data);
        this.items=data.sort((a:any,b:any) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        //this.listAirdrop=data.body.sort((a:any,b:any) => a.name > b.name ? 1 : -1);
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      });
      //add by me
  }

  applyDelete(id){
    //alert(id);
    this.isvisible=true;
    const headers = { 
      'Content-Type': 'application/json',
    };

      this.http.get<any>(this.linkService.deletecategorie_endpoint+"/"+id,  {headers} ).subscribe(data => {
        console.log(data);
        
        if(data.message=="Category Deleted"){
            this.msgsuccesscatpop="La suppression a été bien effectuée !";
            this.msgerrorcatpop="";
            this.msgerrorcat="";
            this.msgsuccesscat="";
            this.isvisible=false;
            this.listerCategorie();
        }else if(data.message=="This category link to a product !") {
            this.msgsuccesscatpop="";
            this.msgerrorcatpop="Impossible de supprimer cette catégorie. Elle est reliée à d'autres produits !";
            this.msgerrorcat="";
            this.msgsuccesscat="";
            this.isvisible=false;
        }
         
        //  this.listPub=data.body; 
        
      }, error => {
        console.log(error);
      });
  }

  modifArticle(name:string, id:string){
    //alert(sessionStorage.getItem('idUser'));
    
    this.msgerrorcatmodif="";
    this.msgsuccesscatmodif="";
    if(name=="" || name===undefined  || name===null){

      this.msgerrorcatmodif="Merci d'ajouter une catégorie !";
      this.msgsuccesscatmodif="";

   }else{
   
    this.msgerrorcatmodif="";
  
    const data = {
      "name": name
    }

    this.http.put<any>(this.linkService.updatecategorie_endpoint+"/"+id, data).subscribe(res => {
      //send success response
          console.log(res);
           //alert(res.body._id);
          
            if(res.name!=""){
              this.msgsuccesscatmodif="La modification a été effectuée avec succés !";
              this.msgerrorcatmodif="";
              this.isvisible=false;
            }else if(res.detail!=""){
              this.msgerrorcatmodif="Echec lors de la modification";
              this.msgsuccesscatmodif="";
              this.isvisible=false;
            }else{

            }
                            
      }, (err) => {
        //send error response
          console.log(err);
        });

   }
  }

}
