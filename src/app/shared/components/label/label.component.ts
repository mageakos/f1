import {
  Component,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { MyLib } from '../../classes/my-lib';

@Component({
  selector: 'f1-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent {
  @Input() data = 'title';
  @Input() label: string;
  @Input() format: string;
  @Input() mode = 'view'; // default mode is view
  @Input() id: string;
  @Output() dataUpdated = new EventEmitter();

  constructor() {}

  modelChanged(eventData) {
    this.dataUpdated.emit(eventData.target.value);
  }

  getId() {
    this.id = this.id || MyLib.valid.getId();
    return this.id;
  }
}
