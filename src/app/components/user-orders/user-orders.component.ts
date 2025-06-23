import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/Services/auth.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {
  constructor(private authservice:AuthService,private router:Router){
  
    }
  
    ngOnInit(): void {
      this.getOrdersOfCustomer()
    }
  
    getOrdersOfCustomer(){
  this.authservice.getOrdersOfCustomer().subscribe((res:any)=>{
    
  })
    }

    gotodetails(){
this.router.navigate(['order-details'])
    }

}
