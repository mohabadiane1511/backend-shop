import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../../shared/service/apilink.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  email: any;
  password: any;
  msgerror: string = '';

  md5 = new Md5();

  constructor(private http: HttpClient, private spinnerService: NgxSpinnerService, private linkService: ApilinkService, private router: Router) {

  }

  ngOnInit() {

    this.email = "";
    this.password = "";
    // this.spinnerService.show();

  }


  isValidEmail(email: string): boolean {
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      return (pattern.test(email));

    } catch (TypeError) {
      return false;
    }
  }

  login() {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.email == "" && this.password == "") {

      this.msgerror = "Merci de remplir tous les champs !";

    } else if (this.email == "" && this.password != "") {

      this.msgerror = "Merci de remplir l'email !";

    } else if (this.email != "" && this.password == "") {

      this.msgerror = "Merci de remplir le mot de passe !";

    } else if (this.email != "" && this.isValidEmail(this.email) != true) {

      this.msgerror = "L'adresse email est incorrecte !";

    } else {
      this.spinnerService.show();

      this.password = Md5.hashStr(this.password);
      // alert(this.password);
      const datadd = {
        "email": this.email,
        "password": this.password
      };

      //alert(this.email+this.password);

      this.http.post<any>(this.linkService.login_endpoint, (datadd), { headers }).subscribe(
        (response) => {
          console.log(response);
          //alert(response.result);
          if (response.message == "success") {
            sessionStorage.setItem('emailUser', response.data.email);
            sessionStorage.setItem('rightUser', response.data.role.type);
            sessionStorage.setItem('idUser', response.data.id);
            sessionStorage.setItem('idFournisseur', response.data.supplierid);

            this.router.navigate(['/dashboard/default']);
            this.msgerror = "";
          } else {
            this.msgerror = "Email ou mot de passe incorrect !";
          }
          this.spinnerService.hide();
        },
        (error) => {
          console.log(error);
          this.msgerror = "Impossible de se connecter, network failed !";
          this.spinnerService.hide();
        });


    }
  }


}
