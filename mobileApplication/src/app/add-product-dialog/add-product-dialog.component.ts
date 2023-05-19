import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss'],
})
export class AddProductDialogComponent {
  newProduct: any = {}; // Object to hold the new product data
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
  addProduct(): void {
    this.http.post('https://dummyjson.com/products/add', this.newProduct)
      .subscribe((response: any) => {
        this.dialogRef.close(response);
      }, (error: any) => {
        console.error(error);
      });
  }
}
