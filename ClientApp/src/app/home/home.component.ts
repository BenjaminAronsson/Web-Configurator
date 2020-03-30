import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/Product'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ApiService],
})
export class HomeComponent {

  products: Product[] = [];
  
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  isLoadingResults = true;

  ngOnInit() {
    this.api.getProducts()
    .subscribe(res => {
      this.products = res;
      console.log(res);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}



