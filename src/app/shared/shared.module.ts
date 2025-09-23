import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { ReversePipe } from './../shared/pipes/reverse.pipe';
import { TimeAgoPipe } from './../shared/pipes/time-ago.pipe';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { ProductComponent } from './../shared/components/product/product.component';
import { ProductsComponent } from './../shared/components/products/products.component';
import { ImgComponent } from './../shared/components/img/img.component';


@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductComponent,
    ProductsComponent,
    ImgComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductComponent,
    ProductsComponent,
    ImgComponent
  ]
})
export class SharedModule { }
