import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'f1-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() loading = false;
  constructor() {}

  ngOnInit() {}
}
