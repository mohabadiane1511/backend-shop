import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import 'hammerjs';
import 'mousetrap';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    Ng2SmartTableModule,
    JwPaginationModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    NgbActiveModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
})
export class InvoiceModule { }
