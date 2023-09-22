import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../../../shared/service/apilink.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
 
  listcategorie:any='';
  nom:any;
  prix:any;
  description:any;
  categorie:any;
  file_data: any='';
  msgerror:any;
  msgsuccess:any;
  msgerrorcat:any;
  msgsuccesscat:any;
  nom_categorie:any;

  constructor(private http: HttpClient, private spinnerService: NgxSpinnerService, private linkService: ApilinkService) {
    
  }
  
  ngOnInit() {
    this.listerCategorie();
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.categorie = event.target.value;
    //alert(this.categorie);
  }

  fileChange(event:any) {
   
    const file:File = event.target.files[0];
    //check whether file is selected or not
    if (file) {
        console.log(file);
        //get file information such as name, size and type
        //console.log('finfo',file.name,file.size,file.type);
        //max file size is 4 mb
       if((file.size/1048576)<=2){
            let formData = new FormData();
            formData.append('file', file, file.name);
            this.file_data=formData;
           // console.log(this.file_data);
       } else{
        this.file_data="fichier lourd";
       }       
        
    }else{
      this.file_data="";
    }

  }

  listerCategorie(){
    const headers = { 
      'Content-Type': 'application/json'
      };

     this.http.get<any>(this.linkService.listcategorie_endpoint,  {headers} ).subscribe(data => {
        console.log(data);
        this.listcategorie=data;
      }, error => {
        console.log(error);
      });
  }

  addProduit(){
      
      this.msgerror="";
      this.msgsuccess="";
      
      if(this.file_data=="" || this.file_data===null || this.nom===undefined || this.nom=="" || this.nom===null || this.prix===undefined || this.prix=="" || this.prix===null || this.description===undefined || this.description=="" || this.description===null || this.categorie===undefined || this.categorie=="" || this.categorie===null){

        this.msgerror="Merci de remplir tous les champs !";
        this.msgsuccess="";

      }else if(this.file_data=="fichier lourd"){
        this.msgerror="La taille du fichier doit être inférieur à 2 Mo";
        this.msgsuccess="";
      }else{

        this.spinnerService.show();

        this.msgerror="";

        const headers = { 
          'Content-Type': 'application/json'
        };
     

        this.http.post<any>(this.linkService.uploadimageproduit_endpoint, this.file_data).subscribe(res => {
          //send success response
              console.log(res);
               //alert(res.body._id);
                if(res.filename!=""){
                      const data = {
                        "name": this.nom,
                        "description" : this.description,
                        "price": this.prix,
                        "image" :  res.filename,
                        "category" :  "/api/categories/"+this.categorie
                      }
                       this.http.post<any>(this.linkService.addproduit_endpoint, data, { headers: headers }).subscribe(res1 => {
                        console.log(res1);
                        if(res1.message=="Product already exists !"){

                          this.msgerror="Le produit existe déjà !";
                          this.msgsuccess="";

                        }else if(res1.message=="success"){

                          this.msgsuccess="Nouveau produit "+this.nom+" ajouté avec succés !";
                          this.msgerror="";
                          this.nom="";
                          this.prix="";
                          this.description="";
                          this.file_data="";

                        }else{

                        }

                        this.spinnerService.hide();
                       
                        }, (err) => {
                                  //send error response
                              console.log(err);
                              this.msgerror="Echec lors de l'ajout d'un nouveau produit !";
                              this.spinnerService.hide();
                        });   
    
                }                       
        }, 
        (err) => {
            //send error response
              console.log(err);
        });

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

}
