import { Component, OnInit, Input } from '@angular/core';
import { MyLib } from '../../classes/my-lib';

@Component({
  selector: 'f1-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() id: string;
  @Input() actions: any;
  @Input() entityData: any;
  @Input() mode: string; // View || Edit || Add

  constructor() {}

  ngOnInit() {}

  dataChanged(e) {
    return e;
  }

  getId() {
    this.id = this.id || MyLib.valid.getId();
    return this.id;
  }
}
