import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailinvoiceComponent } from './detailinvoice.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'detailinvoice/:id',
        component:  DetailinvoiceComponent,
        data: {
          title: "Detail-invoice",
          breadcrumb: "Detail-invoice"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailinvoiceRoutingModule { }
