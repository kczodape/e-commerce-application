import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { ProductDetailsDialogComponentComponent } from '../product-details-dialog-component/product-details-dialog-component.component';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { UpdateProductDialogComponent } from '../update-product-dialog/update-product-dialog.component';

@Component({
  selector: 'app-all-mobile-products',
  templateUrl: './all-mobile-products.component.html',
  styleUrls: ['./all-mobile-products.component.scss'],
})
export class AllMobileProductsComponent implements OnInit {
  categories: string[] = [];

  // Code for pagination
  mobileProducts: any[] = [];
  filteredProducts: any[] = [];
  pagedProducts: any[] = [];
  dataSource!: MatTableDataSource<any>;
  pageOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  pageNumber = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit() {
    this.fetchMobileProducts();

    this.fetchProductCategories(); // Fetch product categories
  }

  // Function to open the update dialog
  openUpdateDialog(product: any) {
    const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
      width: '800px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((updatedProduct) => {
      if (updatedProduct) {
        // Update the corresponding product data in the dataSource
        const index = this.filteredProducts.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          this.filteredProducts[index] = updatedProduct;
        this.dataSource.data = this.filteredProducts;
        this.updatePagedProducts();
        }
      }
    });
  }

  // Function to update a product
  //  updateProduct(updatedProduct: any) {
  //   const updateUrl = `https://dummyjson.com/products/${updatedProduct.id}`;

  //   this.http.put(updateUrl, updatedProduct, { headers: { 'Content-Type': 'application/json' } }).subscribe(
  //     () => {
  //       // Update the product details in the filtered products array
  //       this.filteredProducts = this.filteredProducts.map((product) =>
  //         product.id === updatedProduct.id ? updatedProduct : product
  //       );

  //       // Update the table data source
  //       this.dataSource.data = this.filteredProducts;

  //       console.log('Product updated successfully.');
  //     },
  //     (error) => {
  //       console.error('Error updating product:', error);
  //     }
  //   );
  // }

  // Fetch product categories
  fetchProductCategories() {
    this.http
      .get<string[]>('https://dummyjson.com/products/categories')
      .subscribe(
        (data) => {
          this.categories = data;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
  }

  // Function triggered when a category is selected
  onCategorySelected(category: string) {
    if (category === 'None') {
      // If 'None' is selected, display all products
      this.filteredProducts = this.mobileProducts;
    } else {
      // Filter products by selected category
      this.filteredProducts = this.mobileProducts.filter(
        (product) => product.category === category
      );
    }

    this.dataSource.data = this.filteredProducts;
    this.updatePagedProducts();
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the submitted product data here
        this.filteredProducts.push(result);
        this.dataSource.data = this.filteredProducts;
        this.updatePagedProducts();
        console.log('New product:', result);
      }
    });
  }

  // Function to delete a product
  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      const deleteUrl = `https://dummyjson.com/products/${productId}`;

      this.http.delete(deleteUrl).subscribe(
        () => {
          // Remove the deleted product from the filtered products array
          this.filteredProducts = this.filteredProducts.filter(
            (product) => product.id !== productId
          );

          // Update the table data source
          this.dataSource.data = this.filteredProducts;

          // Update the paged products
          this.updatePagedProducts();

          console.log('Product deleted successfully.');
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  // For fetching all the products
  fetchMobileProducts() {
    this.http.get<any>('https://dummyjson.com/products').subscribe(
      (response) => {
        this.mobileProducts = response.products;
        this.filteredProducts = this.mobileProducts;
        this.dataSource = new MatTableDataSource<any>(this.filteredProducts);
        this.dataSource.paginator = this.paginator;
        this.updatePagedProducts();
        console.log(this.mobileProducts);
      },
      (error: any) => {
        console.error('Error fetching mobile products:', error);
      }
    );
  }

  searchProducts(searchQuery: string) {
    if (searchQuery.trim() !== '') {
      this.http
        .get<any>('https://dummyjson.com/products/search?q=' + searchQuery)
        .subscribe(
          (response) => {
            this.filteredProducts = response.products;
            this.dataSource.data = this.filteredProducts;
            this.updatePagedProducts();
          },
          (error: any) => {
            console.error('Error searching for products:', error);
          }
        );
    } else {
      this.filteredProducts = this.mobileProducts;
      this.dataSource.data = this.filteredProducts;
      this.updatePagedProducts();
    }
  }
  updatePagedProducts() {
    const startIndex = this.pageNumber * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
  //Open dialog box having perticular produc details
  openProductDetailsDialog(product: any) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponentComponent, {
      width: '800px',
      data: product,
    });
  }

  viewProductDetails(productId: number) {
    // Use the updated product data as needed
    // console.log('Updated product:', updatedProduct);
    this.http.get<any>('https://dummyjson.com/products/' + productId).subscribe(
      (response) => {
        const dialogRef = this.dialog.open(
          ProductDetailsDialogComponentComponent,
          {
            width: '800px',
            data: response,
          }
        );
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
    const product = this.filteredProducts.find((p) => p.id === productId);
    if (product) {
      this.openProductDetailsDialog(product);
    }
  }

  onPageChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
