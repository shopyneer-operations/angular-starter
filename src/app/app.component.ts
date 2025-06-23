import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {


  items = [
    {
      image: 'assets/images/card-img.png',
      title: 'Dazzler Glitter مجموعة للشفاه من شيمر',
      discount: 'خصم 46%',
      oldPrice: 'جنيه 340.00',
      newPrice: 'جنيه 310.00',
      reviews: 100
    },
    // Add more items as needed
  ];


  ngOnInit(): void {
    initFlowbite();
  }
}