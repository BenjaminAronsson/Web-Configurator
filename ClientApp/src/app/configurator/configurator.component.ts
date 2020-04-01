import { Component, Inject, Input, Output , EventEmitter} from '@angular/core';
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
    var temp = this.selectedValues.filter(obj => obj.parameterId != value.parameterId);
    temp.push(value);
    this.selectedValues = temp;

    //update and disable options
    //console.log("Update, not implemented", value, this.selectedItValues);
    this.updateParameters.emit(null)
  }

  @Output() updateParameters = new EventEmitter();

  testParam: ParameterValues = {
    parameterId: 1,
    id: 1,
    name: null
  }

  //update on press
  selectedValues: ParameterValues[] = [];//[this.testParam];

  disabledOptions(parameter: Parameter): number[] {
    
    //disalowed values
    var disAllowed: number[] = [];
    
    //test
    // if(parameter.id != 1) {
    //   return disAllowed;
    // }

    console.log(parameter.name);
    

    
    
    
    
    
    
    //test all rules 
    this.rules.forEach((rule) => {  
      
      //isRuleActive
      var isRuleActive = false;
      
      this.selectedValues.forEach(value => {
        var selectedIncompatableValue = rule.incompatableValues.find(v => v.id == value.id);
        if (selectedIncompatableValue && selectedIncompatableValue.parameterId != parameter.id) {
          isRuleActive = true;
          //break;
        }
      });
      
      console.log(isRuleActive);
      if (isRuleActive) {
        //filter all rules for parameter
        var valuesForParameter = rule.incompatableValues.filter(value => value.parameterId == parameter.id);
        valuesForParameter.forEach(v => disAllowed.push(v.id));
        
      }
      
      











      
      // //does the rule contain values that conflict with this parameter
      // var conflictingValuesForParameter = rule.incompatableValues.filter(e => e.parameterId == parameter.id);
      // // console.log("disabled Options called ", parameter.name, conflictingValuesForParameter);
      
      // if(conflictingValuesForParameter.length > 0) {
        
      //   //continue if or more of theese values are selected
      //   var notSelectedConflicts = conflictingValuesForParameter.filter(conflictingValue => {
          
      //     //return false if conflictingValue is in selected values
      //     var foundConflict = this.selectedItValues.find(e => e.id == conflictingValue.id);  
      //     //console.log("conflicts ", foundConflict, this.selectedItValues, conflictingValue.id);
          
      //     return foundConflict == null;
      //   })
        
      //   if(notSelectedConflicts.length > 0) {
      //     //console.log("conflicting rules", notSelectedConflicts);
      //     //add all values tha is not selected
      //     //console.log("not selected conflict: ",notSelectedConflicts);
          
      //     disAllowed.push(notSelectedConflicts);
      //   }
      //}

    });
    
    //return disallowed options
    console.log("disallowed: ", disAllowed);
    
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
      console.log("this is all rules: ", this.rules);
      
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



