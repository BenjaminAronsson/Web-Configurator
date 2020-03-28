import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'picker-component',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent {

  @Input() parameter: Parameter;


  @Input() choices: string[];
  @Input() message: string;
  //@Input() isDisabled = false;

  @Output() selected = new EventEmitter<string>();
  

  select(item: string) {
    this.selected.emit(item);
  }

  isDisabled(item: string): boolean {
    //when object is in not allowed
    
    return item.length < 4;
  }
}
