import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ngx-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { JwPaginationModule } from 'jw-angular-pagination';


import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

import { DetailinvoiceRoutingModule } from './detailinvoice-routing.module';
import { DetailinvoiceComponent } from './detailinvoice.component';


@NgModule({
  declarations: [DetailinvoiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    Ng2SmartTableModule,
    NgbModule,
    DropzoneModule,
    SharedModule,
    JwPaginationModule,
    DetailinvoiceRoutingModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    NgbActiveModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SharedModule],
})
export class DetailinvoiceModule { }
