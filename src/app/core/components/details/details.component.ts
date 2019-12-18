import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnChanges {
  @Input() actions: any;
  @Input() entityData: any;
  @Input() mode: any;

  constructor() {}

  ngOnInit() {
    console.log(this.entityData);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.entityData);
  }

  dataChanged(e) {
    return e;
  }
}

