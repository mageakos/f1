import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {
  @Input() options: any[];

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
