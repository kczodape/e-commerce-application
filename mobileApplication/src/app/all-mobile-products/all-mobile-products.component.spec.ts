import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMobileProductsComponent } from './all-mobile-products.component';

describe('AllMobileProductsComponent', () => {
  let component: AllMobileProductsComponent;
  let fixture: ComponentFixture<AllMobileProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMobileProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMobileProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
