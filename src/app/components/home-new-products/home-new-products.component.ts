import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselComponent } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home-new-products',
  templateUrl: './home-new-products.component.html',
  styleUrls: ['./home-new-products.component.css']
})
export class HomeNewProductsComponent {

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
  items_caresoul =[1,2,3,4,5]
  categories =[
    {id:1,
      name:'الأزياء والموضة',
      src:'assets/images/Sub_cat.png'
    },
    {id:2,
      name:'الأزياء والموضة',
      src:'assets/images/Sub_cat.png'
    },
    {id:3,
      name:'الأزياء والموضة',
      src:'assets/images/Sub_cat.png'
    },
    {id:4,
      name:'الأزياء والموضة',
      src:'assets/images/Sub_cat.png'
    },
    {id:5,
      name:'الأزياء والموضة',
      src:'assets/images/Sub_cat.png'
    },
    {id:6,
      name:'الأزياء والموضة',
      src:'assets/images/Sub_cat.png'
    }
  ]
  
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
