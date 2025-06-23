import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sale-by-category',
  templateUrl: './sale-by-category.component.html',
  styleUrls: ['./sale-by-category.component.css']
})
export class SaleByCategoryComponent  implements OnInit{

productCategories:any[]=[]

  constructor(private productService:ProductService){

  }

ngOnInit(): void {
 // this.getCategries()
}
/*
  getCategries(){
    this.productService.getCategories().subscribe((res:any)=>{
      this.productCategories = res.product_categories
      console.log(this.productCategories)
    })
  }
    */

}
