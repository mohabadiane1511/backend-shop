import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivraisonRoutingModule } from './livraison-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ngx-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ZoneComponent } from './zone/zone.component';
import { QuartierComponent } from './quartier/quartier.component';
import { SharedModule } from '../../shared/shared.module';
import { JwPaginationModule } from 'jw-angular-pagination';


import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};


@NgModule({
  declarations: [ZoneComponent, QuartierComponent],
  imports: [
    CommonModule,
    LivraisonRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    Ng2SmartTableModule,
    NgbModule,
    DropzoneModule,
    SharedModule,
    JwPaginationModule
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
export class LivraisonModule { }
