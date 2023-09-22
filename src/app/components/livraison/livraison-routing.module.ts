import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZoneComponent } from './zone/zone.component';
import { QuartierComponent } from './quartier/quartier.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'livraison/zone',
        component: ZoneComponent,
        data: {
          title: "zone",
          breadcrumb: "zone"
        }
      },
      {
        path: 'livraison/quartier',
        component: QuartierComponent,
        data: {
          title: "quartier",
          breadcrumb: "quartier"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRoutingModule { }
