import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'f1-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  public withMessage: string;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.withMessage = this.activeRoute.snapshot.paramMap.get('withMessage');
  }

}
