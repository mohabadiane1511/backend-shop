import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApilinkService {
  login_endpoint: string = 'https://api.sunudieune.com/api/admin/user_login';
  listcategorie_endpoint: string = 'https://api.sunudieune.com/api/categories';
  addproduit_endpoint: string = 'https://api.sunudieune.com/api/product_add';
  uploadimageproduit_endpoint: string = 'https://api.sunudieune.com/api/product_upload_image';
  listproduit_endpoint: string = 'https://api.sunudieune.com/api/product_list';
  addcategorie_endpoint: string = 'https://api.sunudieune.com/api/admin/category_add';
  deletecategorie_endpoint: string = 'https://api.sunudieune.com/api/admin/category_remove';
  updatecategorie_endpoint: string = 'https://api.sunudieune.com/api/categories';
  deleteproduit_endpoint: string = 'https://api.sunudieune.com/api/admin/product_remove';
  updateproduit_endpoint: string = 'https://api.sunudieune.com/api/product_update';
  addfournisseur_endpoint: string = 'https://api.sunudieune.com/api/company_add';
  listfournisseur_endpoint: string = 'https://api.sunudieune.com/api/supplier_list';
  updatefournisseur_endpoint: string = 'https://api.sunudieune.com/api/supplier_update';
  deletefournisseur_endpoint: string = ' https://api.sunudieune.com/api/admin/supplier_remove';
  addelivery_endpoint: string = 'https://api.sunudieune.com/api/admin/delivery_add';
  listdelivery_endpoint: string = 'https://api.sunudieune.com/api/admin/delivery_list';
  deletedelivery_endpoint: string = 'https://api.sunudieune.com/api/admin/delivery_remove';
  updatedelivery_endpoint: string = 'https://api.sunudieune.com/api/admin/delivery_update';
  addcity_endpoint: string = 'https://api.sunudieune.com/api/admin/city_add';
  listcity_endpoint: string = 'https://api.sunudieune.com/api/admin/city_list';
  deletecity_endpoint: string = 'https://api.sunudieune.com/api/admin/city_remove';
  updatecity_endpoint: string = 'https://api.sunudieune.com/api/admin/city_update';
  addoffre_endpoint: string = 'https://api.sunudieune.com/api/admin/offer_add';
  offerlist_endpoint: string = 'https://api.sunudieune.com/api/admin/offer_list';
  deleteoffre_endpoint: string = 'https://api.sunudieune.com/api/admin/offer_delete';
  updateoffre_endpoint: string = 'https://api.sunudieune.com/api/admin/offer_update';
  listcommande_endpoint: string = 'https://api.sunudieune.com/api/admin/order_list';
  listorderitem_endpoint: string = 'https://api.sunudieune.com/api/admin/order_item_list';
  productbysupplier_endpoint: string = 'https://api.sunudieune.com/api/admin/product_by_supplier';
  choosesupplier_endpoint: string = 'https://api.sunudieune.com/api/admin/order_item_update';
  statnbroffrefournisseur_endpoint: string = 'https://api.sunudieune.com/api/admin/number_offer';
  statcommandefournisseur_endpoint: string = 'https://api.sunudieune.com/api/admin/number_order_ca';
  cancelorder_endpoint: string = 'https://api.sunudieune.com/api/admin/order_cancel';
  terminerorder_endpoint: string = 'https://api.sunudieune.com/api/admin/order_end';
  statcommandeadmin_endpoint: string = 'https://api.sunudieune.com/api/admin/stat_order';
  inactifournisseur_endpoint: string = 'https://api.sunudieune.com/api/supplier_update_status';


  constructor() { }
}
