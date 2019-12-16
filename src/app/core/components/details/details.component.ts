import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public actions: any;
  public entityData: any;
  public mode: any;

  constructor() {}

  ngOnInit() {}

  dataChanged(e) {
    return e;
  }
}
