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

  isDisabled(valueId: number): boolean {
    var value = this.disabledOptions.includes(valueId); 
    return value;
  }

  select(item: string) {
    this.selected.emit(item);
  }
}
