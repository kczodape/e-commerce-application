import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details-dialog-component',
  templateUrl: './product-details-dialog-component.component.html',
  styleUrls: ['./product-details-dialog-component.component.scss'],
})
export class ProductDetailsDialogComponentComponent {
  product: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.product = data;
  }
  lotsOfTabs = new Array(30).fill(0).map((_, index) => `Tab ${index}`);
}
