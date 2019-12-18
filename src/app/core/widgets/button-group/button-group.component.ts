import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from '@angular/core';
import { IButtonGroup } from '../../classes/models';
import { isObject } from 'util';
import { Valid } from '../../classes/validators';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit, OnChanges {
  @Input() options: IButtonGroup;

  constructor() {}

  ngOnInit() {
    this.validate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.validate();
  }

  GetButtonText(value: any) {
    if (typeof value === 'function') {
      return value();
    } else {
      return value;
    }
  }

  // validate widget
  validate() {
    Valid.validator(isObject(this.options), 'options are not an object');
  }
}
