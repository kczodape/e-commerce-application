import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.scss']
})
export class UpdateProductDialogComponent {
  updatedProduct: any; // Store the updated product data
  // product: any = {};

  constructor(
    private dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.updatedProduct = { ...data };
  }

  updateProduct() {
    const url = `https://dummyjson.com/products/${this.updatedProduct.id}`;
    const payload = {
      title: this.updatedProduct.title,
      description: this.updatedProduct.description,
      price: this.updatedProduct.price,
      discountPercentage: this.updatedProduct.discountPercentage,
      rating: this.updatedProduct.rating,
      stock: this.updatedProduct.stock,
      brand: this.updatedProduct.brand,
      category: this.updatedProduct.category,
      thumbnail: this.updatedProduct.thumbnail,
      images: this.updatedProduct.images
    };

    this.http.put(url, payload).subscribe(
      (response) => {
        console.log('Product updated:', response);
        this.dialogRef.close(this.updatedProduct);// Close the dialog and pass the updated product data to the parent component
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  cancel() {
    this.dialogRef.close(false); // Indicate that the update was canceled
  }
}
