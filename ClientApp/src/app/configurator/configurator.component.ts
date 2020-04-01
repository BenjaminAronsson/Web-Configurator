import { Component, Output , EventEmitter} from '@angular/core';
import { ApiService } from '../api.service';
import { Product, Rule, Parameter, ParameterValues } from '../models/Product'
import { Router, ActivatedRoute } from '@angular/router';

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
    this.updateParameters.emit(null)
  }

  @Output() updateParameters = new EventEmitter();

  //update on press
  selectedValues: ParameterValues[] = [];

  disabledOptions(parameter: Parameter): number[] {
    
    //disalowed values
    var disAllowed: number[] = [];
    

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
      
      if (isRuleActive) {
        //filter all rules for parameter
        var valuesForParameter = rule.incompatableValues.filter(value => value.parameterId == parameter.id);
        valuesForParameter.forEach(v => disAllowed.push(v.id));
        
      }
    });
    
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
