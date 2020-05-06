import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'f1-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public copyRightYear: any;
  public gitName: string;
  constructor() {}

  ngOnInit() {
    this.copyRightYear = new Date().getFullYear();
    this.gitName = 'gsimantiras';
  }
}
