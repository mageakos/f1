import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"]
})
export class PageNotFoundComponent implements OnInit {
  public withMessage: string;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.withMessage = this.activeRoute.snapshot.paramMap.get("withMessage");
  }

  // @HostListener("window:popstate", ["$event"])
  // onPopState(event) {
  //   console.log("Back button pressed");
  // }
}
