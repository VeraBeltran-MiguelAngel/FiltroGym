import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  public products : any = [];
  public grandTotal !: number;
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
