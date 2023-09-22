import { Component, OnInit } from '@angular/core';
import * as chartData from '../../shared/data/chart';
import { doughnutData, pieData } from '../../shared/data/chart';
import { HttpClient } from '@angular/common/http';
import { ApilinkService } from './../../shared/service/apilink.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public doughnutData = doughnutData;
  public pieData = pieData;
  constructor(private http: HttpClient, private linkService: ApilinkService) {
    Object.assign(this, { doughnutData, pieData })
  }

  // doughnut 2
  /*public view = chartData.view;
  public doughnutChartColorScheme = chartData.doughnutChartcolorScheme;
  public doughnutChartShowLabels = chartData.doughnutChartShowLabels;
  public doughnutChartGradient = chartData.doughnutChartGradient;
  public doughnutChartTooltip = chartData.doughnutChartTooltip;

  public chart5 = chartData.chart5;


  // lineChart
  public lineChartData = chartData.lineChartData;
  public lineChartLabels = chartData.lineChartLabels;
  public lineChartOptions = chartData.lineChartOptions;
  public lineChartColors = chartData.lineChartColors;
  public lineChartLegend = chartData.lineChartLegend;
  public lineChartType = chartData.lineChartType;

  // lineChart
  public smallLineChartData = chartData.smallLineChartData;
  public smallLineChartLabels = chartData.smallLineChartLabels;
  public smallLineChartOptions = chartData.smallLineChartOptions;
  public smallLineChartColors = chartData.smallLineChartColors;
  public smallLineChartLegend = chartData.smallLineChartLegend;
  public smallLineChartType = chartData.smallLineChartType;

  // lineChart
  public smallLine2ChartData = chartData.smallLine2ChartData;
  public smallLine2ChartLabels = chartData.smallLine2ChartLabels;
  public smallLine2ChartOptions = chartData.smallLine2ChartOptions;
  public smallLine2ChartColors = chartData.smallLine2ChartColors;
  public smallLine2ChartLegend = chartData.smallLine2ChartLegend;
  public smallLine2ChartType = chartData.smallLine2ChartType;

  // lineChart
  public smallLine3ChartData = chartData.smallLine3ChartData;
  public smallLine3ChartLabels = chartData.smallLine3ChartLabels;
  public smallLine3ChartOptions = chartData.smallLine3ChartOptions;
  public smallLine3ChartColors = chartData.smallLine3ChartColors;
  public smallLine3ChartLegend = chartData.smallLine3ChartLegend;
  public smallLine3ChartType = chartData.smallLine3ChartType;

  // lineChart
  public smallLine4ChartData = chartData.smallLine4ChartData;
  public smallLine4ChartLabels = chartData.smallLine4ChartLabels;
  public smallLine4ChartOptions = chartData.smallLine4ChartOptions;
  public smallLine4ChartColors = chartData.smallLine4ChartColors;
  public smallLine4ChartLegend = chartData.smallLine4ChartLegend;
  public smallLine4ChartType = chartData.smallLine4ChartType;

  public chart3 = chartData.chart3;*/


  right: string = "";
  iduser: string = "";
  nbroffre: string = "";
  nbrcommande: string = "";
  nbrcommandeadminencours: string = "";
  nbrcommandeadminannuler: string = "";
  nbrcommandeadminterminer: string = "";
  nbrproduitotal: string = "";
  ca: string = "";
  // events
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }

  ngOnInit() {
    this.right = sessionStorage.getItem('rightUser');
    this.iduser = sessionStorage.getItem('idFournisseur');
    this.nbrOffrefournisseur();
    this.nbrCommandefournisseur();
    this.nbrCommandeAdmin();
    this.nbrproduit();
  }


  nbrOffrefournisseur() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.linkService.statnbroffrefournisseur_endpoint + "/" + this.iduser, { headers }).subscribe(data => {

      this.nbroffre = data.data[0].nombre_offres;
      console.log(this.nbroffre);

    }, error => {
      console.log(error);
    });
    //add by me
  }

  nbrCommandefournisseur() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.linkService.statcommandefournisseur_endpoint + "/" + this.iduser, { headers }).subscribe(data => {
      this.nbrcommande = data.data[0].nombre_commandes;
      console.log(this.nbrcommande);
      this.ca = data.data[0].CA;
      console.log(data.data[0]);

    }, error => {
      console.log(error);
    });
    //add by me
  }

  nbrCommandeAdmin() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.linkService.statcommandeadmin_endpoint, { headers }).subscribe(data => {
      this.nbrcommandeadminencours = data.encours;
      this.nbrcommandeadminannuler = data.annuler;
      this.nbrcommandeadminterminer = data.terminer;

    }, error => {
      console.log(error);
    });
    //add by me
  }

  nbrproduit() {
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.get<any>(this.linkService.listproduit_endpoint, { headers }).subscribe(data => {
      this.nbrproduitotal = data.numbreOfProducts;

    }, error => {
      console.log(error);
    });
    //add by me
  }

}
