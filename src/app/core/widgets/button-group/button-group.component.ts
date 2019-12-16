import { Component, OnInit, Input } from '@angular/core';
import { IButtonGroup } from '../../classes/models';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {
  @Input() options: IButtonGroup;

  constructor() {}

  ngOnInit() {}

  GetButtonText(value: any) {
    if (typeof value === 'function') {
      return value();
    } else {
      return value;
    }
  }
}
