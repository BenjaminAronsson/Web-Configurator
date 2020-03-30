import { Component, Inject, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Product, Rule, Parameter, ParameterValues } from '../models/Product'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css'],
  providers: [ApiService],
})
export class ConfiguratorComponent {

  
  public product: Product = new Product();  
  
  onSelected(value: ParameterValues) {
    
    //update selectedValues with valueId & parameterId
    var temp = this.selectedItValues.filter(obj => obj.parameterId != value.parameterId);
    temp.push(value);
    this.selectedItValues = temp;

    //update and disable options
    console.log("Update, not implemented", value);
  }
  
  testParamValue: ParameterValues = {
    id: 1,
    parameterId: 4,
    name: null
  };

  //update on press
  selectedItValues: ParameterValues[] = [this.testParamValue];

  disabledOptions(parameter: Parameter): number[] {
    //disalowed values
    var disAllowed = [];

    //test all rules 
    this.rules.forEach((rule) => {  
      
      //find disallowed value for parameter
      rule.incompatableValues.forEach((disAlloweedValue) => {
        //test if rule affects parameter else return 
        if (disAlloweedValue.parameterId != parameter.id) {
          return;
        }

        //if selected values colide with rule
        var IsColiding = this.selectedItValues.find(e => e.parameterId == disAlloweedValue.parameterId && e.id != disAlloweedValue.id); 
        
        if (IsColiding) {
          //add to disallowed parameter values
          disAllowed.push(disAlloweedValue.id);
          console.log("dissallowed values for" + parameter.name, disAlloweedValue.id);
        }
      }) 
    })
    
    //return disallowed options
    //console.log(disAllowed);
    
    return disAllowed;
  }  

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  id: number = 1;
  rules: Rule[];
  isLoadingResults = true;

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.api.getProduct(this.id)
    .subscribe(res => {
      this.product = res;

      //Todo make seperate request
      this.rules = res.rules;
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



