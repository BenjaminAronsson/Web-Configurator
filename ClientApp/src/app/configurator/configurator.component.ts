import { Component, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/Product'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css'],
  providers: [ApiService],
})
export class ConfiguratorComponent {

  public product: Product = new Product();

  public selectedValue: string = "None";
  onSelected(value: string) {
    this.selectedValue = value
  }

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  id: number = 1;
  isLoadingResults = true;

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.api.getProduct(this.id)
    .subscribe(res => {
      this.product = res;
      console.log(res);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}



/*********************************** regler  *************************/

/* en regel har en beskrivning*/
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



