import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UsersRoutingModule } from './users-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwPaginationModule } from 'jw-angular-pagination';


@NgModule({
  declarations: [ListUserComponent, CreateUserComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    NgxSpinnerModule,
    JwPaginationModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersModule { }
