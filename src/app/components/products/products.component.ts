import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: any; //para almacenar la respuesta que manda el API con todos los datos
  public filterCategory: any; //para almacenar la respuesta que manda el API con todos los datos pero su fin es realizar un filtro
  searchKey: string = ''; //clave de busqueda qe se le pasa al pipe filter (es el texto que escribe el usuario)

  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productList = res; //guardamos los productos que envia el JSON
      this.filterCategory = res; // guardamos los productos que envia el JSON desde el API

      //agrupar las categorias del JSON , en este caso la ropa se puede filtrar por la categoria moda
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
    });

    //Nos suscribimos al observable search 
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
}
