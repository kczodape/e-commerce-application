import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsDialogComponentComponent } from './product-details-dialog-component.component';

describe('ProductDetailsDialogComponentComponent', () => {
  let component: ProductDetailsDialogComponentComponent;
  let fixture: ComponentFixture<ProductDetailsDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
