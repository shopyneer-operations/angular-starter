import { Component, ViewChild } from '@angular/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-best-seller',
  templateUrl: './product-best-seller.component.html',
  styleUrls: ['./product-best-seller.component.css']
})
export class ProductBestSellerComponent {
  products:any[]=[]
  constructor(private productService:ProductService){
  
  }
    ngOnInit(): void {
    //  this.getAllProducts()
    }
  
  
  
  /*
  getAllProducts(){
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; // Assign the fetched products to the component property
       console.log( this.products )
      },
      error: (err) => {
       // this.err = 'Failed to fetch products. Please try again later.';
      
        console.error(err);
      }
    })
  
  }
  
  
  */
  
    @ViewChild('carousel', { static: false }) carousel!: CarouselComponent;
  
    carouselOptions:OwlOptions = {
      loop: true,
      margin: 10,
      nav: false,
      dots: false,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 5 }
      }
    };
    
    // After view initialization, we can safely interact with the carousel component
    ngAfterViewInit(): void {
      if (this.carousel) {
      }
    }
  
    // Navigate to the previous slide
    prevSlide() {
  
     if (this.carousel) {
        this.carousel.prev(); // Use 'prev' to go to the previous slide
        console.log("prev")
        console.log(this.carousel.navData)
      }
     
    }
  
    // Navigate to the next slide
    nextSlide() {
  
     if (this.carousel) {
      this.carousel.next()// Use 'next' to go to the next slide
      
       }
    
        
    }
}
