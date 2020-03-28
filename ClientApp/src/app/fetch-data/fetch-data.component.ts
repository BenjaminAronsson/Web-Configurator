import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { minProduct, minPararameter, minaVärlden } from '../models';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css'],
})
export class FetchDataComponent {
  public products: Product[];
  public product: minProduct = {
    id: 2312412,
    name: "Elevator",
    parametrar: [
      {
        namn: "el",
        values: [
          {
            id: 123124,
            namn: "220V"
          },
          {
            id: 4444,
            namn: "240V"
          },
         ]
      }
    ]
  }




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

/*jag vill ha en lista med alla parametrar och deras värden kopplade till en produkt
 *
 * alla parametrar för den valda produkten
 * 
 */





//lista med regler 

interface regel {
  //parameter1 && värde1 retunerar parameter2 och värde2
    
}

/* Antagligen hör detta till backend */
interface Product {
  objectID: number;
  name: string;
}

/* en parameter har ett namn och vilken produkt den är kopplad till*/
interface Parameter {
  ObjectID: number;
  ProductID: number; /*(references the ObjectID of a Product)*/
  Name: string;
}

/* varje parameter har ett "värde"/namn och och vilken parameter den hör till*/
interface ParameterValue {
  ObjectID: number;
  ParameterID: number; /*(references the ObjectID of a Parameter)*/
  Name: string;
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






// import { Component, Inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-fetch-data',
//   templateUrl: './fetch-data.component.html'
// })
// export class FetchDataComponent {
//   public forecasts: WeatherForecast[];

  

//   // constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
//   //   http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
//   //     this.forecasts = result;
//   //   }, error => console.error(error));
//   // }
// }

// interface WeatherForecast {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }

