import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/Services/auth.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css']
})
export class UserFavoritesComponent  implements OnInit{
  items = [
    {
      image: 'assets/images/card-img.png',
      title: 'Dazzler Glitter مجموعة للشفاه من شيمر',
      discount: 'خصم 46%',
      reviews: 200,
      oldPrice: 'جنيه 340.00',
      newPrice: 'جنيه 310.00'
    },
    {
      image: 'assets/images/card-img.png',
      title: 'مجموعة أحمر شفاه مطفي',
      discount: 'خصم 30%',
      reviews: 150,
      oldPrice: 'جنيه 220.00',
      newPrice: 'جنيه 190.00'
    },
    {
      image: 'assets/images/card-img.png',
      title: 'مجموعة عطور نسائية مميزة',
      discount: 'خصم 20%',
      reviews: 85,
      oldPrice: 'جنيه 450.00',
      newPrice: 'جنيه 360.00'
    },
    {
      image: 'assets/images/card-img.png',
      title: 'كريم أساس بتركيبة مقاومة للماء',
      discount: 'خصم 25%',
      reviews: 120,
      oldPrice: 'جنيه 280.00',
      newPrice: 'جنيه 210.00'
    },
    {
      image: 'assets/images/card-img.png',
      title: 'مجموعة مكياج شاملة بألوان متعددة',
      discount: 'خصم 35%',
      reviews: 300,
      oldPrice: 'جنيه 600.00',
      newPrice: 'جنيه 390.00'
    },
    {
      image: 'assets/images/card-img.png',
      title: 'ماسكارا بتكثيف الرموش',
      discount: 'خصم 15%',
      reviews: 220,
      oldPrice: 'جنيه 120.00',
      newPrice: 'جنيه 102.00'
    },
    {
      image: 'assets/images/card-img.png',
      title: 'بودرة تثبيت المكياج بلمسة نهائية غير لامعة',
      discount: 'خصم 18%',
      reviews: 75,
      oldPrice: 'جنيه 150.00',
      newPrice: 'جنيه 123.00'
    },
    {
      image: 'assets/images/card-img.png',
      title: 'مجموعة ظلال عيون بدرجات دافئة',
      discount: 'خصم 40%',
      reviews: 400,
      oldPrice: 'جنيه 500.00',
      newPrice: 'جنيه 300.00'
    }
  ];

  constructor(private authservice:AuthService){

  }

  ngOnInit(): void {
    this.getWishListData()
  }

  getWishListData(){
this.authservice.getWishlistOfCustomer().subscribe((res:any)=>{
  
})
  }
}
