import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/Product'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css'],
  providers: [ApiService],
})
export class FetchDataComponent {

  public product: Product = {
    id: 5,
    name: "Elevator",
    parameters: [
      {
        id: 1,
        name: "Power supply",
        parameterValues: [
          {
            id: 77,
            name: "220V"
          },
          {
            id: 78,
            name: "230V"
          },
          {
            id: 79,
            name: "240V"
          },
          {
            id: 80,
            name: "250V"
          },
          {
            id: 81,
            name: "260V"
          }
        ],
      },
    ],
  } 




  public selectedValue: string = "None";
  onSelected(value: string) {
    this.selectedValue = value
  }

  //array, value, title;
  // public outdoors: string[] = ["Yes", "No"];
  // public types: number[] = [4000, 6000, 7000, 9000];
  // public powerSupplys: string[] = ["230V, 1-Phase, 50Hz", "230V, 3-Phase, 60Hz", "380V, 3-Phase, 60Hz", "400V, 3-Phase, 50Hz"];
  // public countries: string[] = ["Austria", "Netherlands", "Sweden", "United States", "Taiwan"];

  // constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //   http.get<Product>(baseUrl + 'weatherforecast').subscribe(result => {
  //     this.product = result;
  //   }, error => console.error(error));
  // }



  /*************************************//******************************************************************************************* */
  constructor(private api: ApiService) {}
  //constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  data: Product[] = [];
  isLoadingResults = true;

  ngOnInit() {
    this.api.getProducts()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}



/*********************************** regler  *************************/

/* en regel har ett namn*/
// interface DisallowedRule {
//   ObjectID: number;
//   Name: string;
// }

// /* regeln indikerar vilken parameter som inter får väljas */
// interface DisallowedParameter {
//   ObjectID: number;
//   DisallowedRuleID: number; /*(references the ObjectID of a DisallowedRule)*/
//   ParameterID: number; /*(references the ObjectID of a Parameter)*/
// }

// /* innehåller det förbjudna värdet och vilken parameter den hör till */
// interface DisallowedValue {
//   ObjectID: number;
//   DisallowedParameterID: number; /*(references the ObjectID of a DisallowedParameter)*/
//   ParameterValueID: number; /*(references the ObjectID of a ParameterValue)*/
// }



//   // constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
//   //   http.get<Products[]>(baseUrl + 'weatherforecast').subscribe(result => {
//   //     this.products = result;
//   //   }, error => console.error(error));
//   // }
// }


