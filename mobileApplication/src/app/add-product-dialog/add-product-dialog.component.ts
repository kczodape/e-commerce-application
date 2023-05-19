import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onAddClick(productForm: NgForm) {
    if (productForm.invalid) {
      return;
    }

    const newProduct = {
      title: productForm.value.title,
      description: productForm.value.description,
      price: productForm.value.price,
      discountPercentage: productForm.value.discountPercentage,
      rating: productForm.value.rating,
      stock: productForm.value.stock,
      brand: productForm.value.brand,
      category: productForm.value.category,
      thumbnail: productForm.value.thumbnail,
      images: productForm.value.images,
    };

    this.dialogRef.close(newProduct);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
