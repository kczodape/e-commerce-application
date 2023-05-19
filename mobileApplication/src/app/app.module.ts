import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllMobileProductsComponent } from './all-mobile-products/all-mobile-products.component';
import { HeaderComponent } from './header/header.component';
// import { SearchSelectAddComponent } from './search-select-add/search-select-add.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { WordlimitpipePipe } from './all-mobile-products/wordlimitpipe.pipe';
import { ProductDetailsDialogComponentComponent } from './product-details-dialog-component/product-details-dialog-component.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AllMobileProductsComponent,
    HeaderComponent,
    // SearchSelectAddComponent,
    WordlimitpipePipe,
    ProductDetailsDialogComponentComponent,
    AddProductDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    CarouselModule.forRoot(),
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
  ],
  providers: [AllMobileProductsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
