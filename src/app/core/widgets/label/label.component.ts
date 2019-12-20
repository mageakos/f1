import { Component, OnInit, SimpleChanges, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit, OnChanges {
  @Input() data = 'title';
  @Input() label: string;
  @Input() format: string;
  @Input() mode = 'view';
  @Output() dataUpdated = new EventEmitter();

  constructor() {}

  ngOnInit() {
    // console.log(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mode && !changes.mode.firstChange) {
      console.log('onChanges', changes);
    }
  }

  modelChanged(eventData) {
    console.log('sth changed', eventData);
    this.dataUpdated.emit({
      prop: this.label,
      data: eventData
    });
  }

}
