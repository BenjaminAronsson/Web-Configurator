import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css'],
})
export class FetchDataComponent {

  public product: Product = {
    id: 5,
    name: "Elevator",
    //parameters: null,
    //rules: null,
  } 
  // public product: Product = {
  //   id: 2312412,
  //   name: "Elevator",
  //   parametrar: [
  //     {
  //       namn: "el",
  //       values: [
  //         {
  //           id: 123124,
  //           namn: "220V"
  //         },
  //         {
  //           id: 4444,
  //           namn: "240V"
  //         },
  //       ]
  //     }
  //   ]
  // }
  public products: Product[] = [this.product];




  public selectedValue: string = "None";
  onSelected(value: string) {
    this.selectedValue = value
  }

  //array, value, title;
  public outdoors: string[] = ["Yes", "No"];
  public types: number[] = [4000, 6000, 7000, 9000];
  public powerSupplys: string[] = ["230V, 1-Phase, 50Hz", "230V, 3-Phase, 60Hz", "380V, 3-Phase, 60Hz", "400V, 3-Phase, 50Hz"];
  public countries: string[] = ["Austria", "Netherlands", "Sweden", "United States", "Taiwan"];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Product[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }
}



/*********************************** regler  *************************/

/* en regel har ett namn*/
interface DisallowedRule {
  ObjectID: number;
  Name: string;
}

/* regeln indikerar vilken parameter som inter får väljas */
interface DisallowedParameter {
  ObjectID: number;
  DisallowedRuleID: number; /*(references the ObjectID of a DisallowedRule)*/
  ParameterID: number; /*(references the ObjectID of a Parameter)*/
}

/* innehåller det förbjudna värdet och vilken parameter den hör till */
interface DisallowedValue {
  ObjectID: number;
  DisallowedParameterID: number; /*(references the ObjectID of a DisallowedParameter)*/
  ParameterValueID: number; /*(references the ObjectID of a ParameterValue)*/
}



//   // constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
//   //   http.get<Products[]>(baseUrl + 'weatherforecast').subscribe(result => {
//   //     this.products = result;
//   //   }, error => console.error(error));
//   // }
// }


