import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { ButtonGroup, Button } from '../../classes/models';
import { MyLib } from '../../classes/my-lib';


@Component({
  selector: 'f1-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
})
export class ButtonGroupComponent implements OnInit, OnChanges {
  @Input() options: ButtonGroup;

  constructor() {}

  ngOnInit() {
    this.validate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.validate();
  }

  invokeBtnAction(btn: Button) {
    if (btn && btn.action && typeof btn.action === 'function') {
      btn.action();
    }
  }

  getButtonValue(value: any, defaultValue) {
    if (typeof value === 'function') {
      return value();
    } else {
      return value || defaultValue;
    }
  }

  getId(btn: Button) {
    if (btn && btn.id) { return btn.id; }
    else { return btn[MyLib.valid.id]; }
  }

  // validate widget
  validate() {
    return (
      MyLib.valid.validateId(this.options) &&
      MyLib.valid.validate(
        MyLib.valid.isObject(this.options),
        '\'options\' is not an object'
      ) &&
      this.options &&
      MyLib.valid.validate(
        MyLib.valid.isObject(this.options.buttons),
        '\'options\' is not an array'
      )
    );
  }
}
