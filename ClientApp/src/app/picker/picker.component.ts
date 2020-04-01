import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Parameter, ParameterValues } from '../models/Product'

@Component({
  selector: 'picker-component',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent {

  @Input() parameter: Parameter;
  @Input() disabledOptions: number[] = []; 

  @Output() selected = new EventEmitter<string>();

  updateRules() {
    console.log("reading rules..");
    
  }
  
  isDisabled(valueId: number): boolean {
    var test = this.disabledOptions.includes(valueId); 
    console.log(this.parameter.name, valueId, test);
    
    return test;
  }

  select(item: string) {
    this.selected.emit(item);
  }
}
